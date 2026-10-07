(() => {
  'use strict';
  const root = document.documentElement;
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  // Loading is a progressive enhancement. Content and controls stay available.
  if (motionPreference.matches || navigator.connection?.saveData) return;

  let complete = false;
  let deadline;
  const finish = () => {
    if (complete) return;
    complete = true;
    window.clearTimeout(deadline);
    root.classList.remove('is-loading');
    root.classList.add('is-ready');
    document.removeEventListener('pointerdown', finish);
    document.removeEventListener('keydown', finish);
  };

  root.classList.add('is-loading');
  // Slow or failed assets must never trap a visitor behind the loader.
  deadline = window.setTimeout(finish, 1400);
  document.addEventListener('pointerdown', finish, {once: true});
  document.addEventListener('keydown', finish, {once: true});
  motionPreference.addEventListener('change', event => {
    if (event.matches) finish();
  });
  window.addEventListener('pageshow', event => {
    if (event.persisted) finish();
  });

  const prepare = () => {
    const images = [...document.querySelectorAll('.brand img, img[fetchpriority="high"]')];
    const assets = images.map(img => img.decode?.().catch(() => {}));
    if (document.fonts) assets.push(document.fonts.ready);
    Promise.allSettled(assets).then(finish);
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', prepare, {once: true});
  } else {
    prepare();
  }
})();
