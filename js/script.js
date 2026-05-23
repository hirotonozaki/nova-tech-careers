/* ============================================================
   NOVA TECH CAREERS — Script
   ------------------------------------------------------------
   構成: IIFE 内に Module パターンで関心を分離
     - Loader        : 初回表示時のローディング演出
     - Header        : スクロール時の見た目変化
     - Drawer        : モバイルナビ (ハンバーガー)
     - Reveal        : スクロールによる要素のフェードイン
     - ToTop         : 「ページトップへ戻る」表示制御
     - SmoothScroll  : アンカーリンクの滑らかなスクロール (fallback)
     - PrefersMotion : 動き軽減設定への対応
   ============================================================ */

(() => {
  'use strict';

  /* JSが有効であることを示すフラグ。CSS側で .no-js セレクタによる
     フォールバック表示を切り替えるために最優先で除去する。 */
  document.documentElement.classList.remove('no-js');

  /* ---------- 共通ヘルパ ---------- */
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const on = (el, type, fn, opts) => el && el.addEventListener(type, fn, opts);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


  /* ============================================================
     Loader: 初回ローディング演出
     - DOMContentLoaded 後、最短 600ms 表示してフェードアウト
     - load イベントを待ち、画像等の主要リソース読み込み完了で消す
     ============================================================ */
  const Loader = {
    init() {
      const loader = $('#loader');
      if (!loader) return;
      const MIN_DURATION = prefersReducedMotion ? 0 : 600;
      const start = performance.now();

      const hide = () => {
        const elapsed = performance.now() - start;
        const delay = Math.max(0, MIN_DURATION - elapsed);
        setTimeout(() => {
          loader.classList.add('is-hidden');
          // 完全に消えてから DOM から除去
          setTimeout(() => loader.remove(), 700);
        }, delay);
      };

      if (document.readyState === 'complete') {
        hide();
      } else {
        window.addEventListener('load', hide, { once: true });
      }
    }
  };


  /* ============================================================
     Header: スクロール量に応じて見た目を切り替え
     - 16px 以上スクロール → 半透明背景 + blur
     - rAF でスロットリング
     ============================================================ */
  const Header = {
    init() {
      const header = $('#header');
      if (!header) return;
      const THRESHOLD = 16;
      let ticking = false;

      const update = () => {
        const y = window.scrollY;
        header.classList.toggle('is-scrolled', y > THRESHOLD);
        ticking = false;
      };
      const onScroll = () => {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      };
      on(window, 'scroll', onScroll, { passive: true });
      update();
    }
  };


  /* ============================================================
     Drawer: モバイル用ハンバーガーメニュー
     - 開閉 / aria-expanded 同期 / ESC・外側タップ・リンクタップで閉じる
     - body にクラスを付けてスクロール固定
     ============================================================ */
  const Drawer = {
    init() {
      const burger = $('#burger');
      const nav    = $('#globalNav');
      if (!burger || !nav) return;

      const open = () => {
        burger.classList.add('is-open');
        nav.classList.add('is-open');
        document.body.classList.add('is-nav-open');
        burger.setAttribute('aria-expanded', 'true');
        burger.setAttribute('aria-label', 'メニューを閉じる');
      };
      const close = () => {
        burger.classList.remove('is-open');
        nav.classList.remove('is-open');
        document.body.classList.remove('is-nav-open');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'メニューを開く');
      };
      const toggle = () => {
        burger.classList.contains('is-open') ? close() : open();
      };

      on(burger, 'click', toggle);

      // ナビ内のリンクをタップしたら閉じる
      $$('a', nav).forEach(a => on(a, 'click', close));

      // ESC キー (閉じたあとフォーカスをハンバーガーに戻す: a11y)
      on(document, 'keydown', e => {
        if (e.key === 'Escape' && burger.classList.contains('is-open')) {
          close();
          burger.focus();
        }
      });

      // 768px を超えたら自動で閉じる(リサイズ対応)
      const mq = window.matchMedia('(min-width: 769px)');
      const onMqChange = e => { if (e.matches) close(); };
      mq.addEventListener ? mq.addEventListener('change', onMqChange)
                          : mq.addListener(onMqChange); // 互換性 fallback
    }
  };


  /* ============================================================
     Reveal: スクロールに連動して要素をフェードイン
     - IntersectionObserver 一度可視化したら監視解除
     - prefers-reduced-motion 有効時は即座に表示
     ============================================================ */
  const Reveal = {
    init() {
      const targets = $$('[data-reveal]');
      if (!targets.length) return;

      if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        // 即座に表示
        targets.forEach(el => el.classList.add('is-revealed'));
        return;
      }

      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            io.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.12
      });

      targets.forEach(el => io.observe(el));
    }
  };


  /* ============================================================
     ToTop: 一定スクロールで「ページトップへ戻る」を表示
     ============================================================ */
  const ToTop = {
    init() {
      const btn = $('#toTop');
      if (!btn) return;
      const THRESHOLD = 600;
      let ticking = false;

      const update = () => {
        btn.classList.toggle('is-visible', window.scrollY > THRESHOLD);
        ticking = false;
      };
      on(window, 'scroll', () => {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      }, { passive: true });
      update();
    }
  };


  /* ============================================================
     SmoothScroll: アンカーリンクをスムーズスクロール
     - CSS の scroll-behavior:smooth で基本動作するが、
       固定ヘッダー分のオフセット補正と古いブラウザの fallback
     ============================================================ */
  const SmoothScroll = {
    init() {
      $$('a[href^="#"]').forEach(a => {
        on(a, 'click', e => {
          const href = a.getAttribute('href');
          if (!href || href === '#') return;
          const target = document.getElementById(href.slice(1));
          if (!target) return;
          e.preventDefault();

          const headerHeight = $('#header')?.offsetHeight ?? 64;
          const top = target.getBoundingClientRect().top + window.scrollY - headerHeight + 1;

          if (prefersReducedMotion) {
            window.scrollTo(0, top);
          } else {
            window.scrollTo({ top, behavior: 'smooth' });
          }

          // 履歴に hash を追加 (戻る対応)
          history.pushState(null, '', href);
        });
      });
    }
  };


  /* ============================================================
     CurrentYear: footer の年号を動的に
     ============================================================ */
  const CurrentYear = {
    init() {
      const el = $('[data-current-year]');
      if (el) el.textContent = String(new Date().getFullYear());
    }
  };


  /* ============================================================
     Init
     ============================================================ */
  const init = () => {
    Loader.init();
    Header.init();
    Drawer.init();
    Reveal.init();
    ToTop.init();
    SmoothScroll.init();
    CurrentYear.init();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
