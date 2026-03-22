(function () {
  var STORAGE_KEY = 'claw-notes-lang';
  var DEFAULT_LANG = 'zh';

  function getCurrentLang() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  }

  function applyLang(lang) {
    if (lang === 'en') {
      document.body.classList.add('lang-en');
      document.body.classList.remove('lang-zh');
    } else {
      document.body.classList.remove('lang-en');
      document.body.classList.add('lang-zh');
    }
    var btn = document.getElementById('lang-toggle');
    if (btn) {
      btn.textContent = lang === 'en' ? 'ZH' : 'EN';
    }
  }

  function toggleLang() {
    var current = getCurrentLang();
    var next = current === 'en' ? 'zh' : 'en';
    localStorage.setItem(STORAGE_KEY, next);
    applyLang(next);
  }

  window.toggleLang = toggleLang;

  applyLang(getCurrentLang());
})();
