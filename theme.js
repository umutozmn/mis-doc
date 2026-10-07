(function () {
  const key = 'mis-portal-theme';
  const root = document.documentElement;

  function isLight() {
    return root.getAttribute('data-theme') === 'alt';
  }

  function updateButton(button) {
    const light = isLight();
    button.querySelector('.theme-toggle-label').textContent = light ? 'Koyu tema' : 'Açık tema';
    button.querySelector('.theme-toggle-icon').textContent = light ? '☾' : '☼';
    button.setAttribute('aria-pressed', String(light));
    button.setAttribute('aria-label', light ? 'Koyu temaya geç' : 'Açık temaya geç');
  }

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'theme-toggle';
  button.innerHTML = '<span class="theme-toggle-icon" aria-hidden="true"></span><span class="theme-toggle-label"></span>';
  button.addEventListener('click', function () {
    if (isLight()) {
      root.removeAttribute('data-theme');
      try { localStorage.setItem(key, 'dark'); } catch (e) {}
    } else {
      root.setAttribute('data-theme', 'alt');
      try { localStorage.setItem(key, 'alt'); } catch (e) {}
    }
    updateButton(button);
  });
  document.body.appendChild(button);
  updateButton(button);
})();
