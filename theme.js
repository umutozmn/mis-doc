(function () {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    const compactWidth = 64;
    const expandedWidth = Math.round(sidebar.getBoundingClientRect().width);
    const collapseKey = 'mis-portal-sidebar-collapsed';
    const collapseButton = document.createElement('button');
    const desktop = window.matchMedia('(min-width: 769px)');
    let collapsed = false;

    document.body.style.setProperty('--sidebar-expanded-width', `${expandedWidth}px`);
    document.body.style.setProperty('--sidebar-collapsed-width', `${compactWidth}px`);

    collapseButton.type = 'button';
    collapseButton.className = 'sidebar-collapse-toggle';
    collapseButton.addEventListener('click', function () {
      collapsed = !collapsed;
      applySidebarState();
      try {
        localStorage.setItem(collapseKey, String(collapsed));
      } catch (e) {
        // Keep the in-page toggle usable when browser storage is unavailable.
      }
    });
    document.body.appendChild(collapseButton);

    try {
      collapsed = localStorage.getItem(collapseKey) === 'true';
    } catch (e) {
      collapsed = false;
    }

    function applySidebarState() {
      document.body.classList.toggle('sidebar-collapsed', collapsed && desktop.matches);
      collapseButton.textContent = collapsed && desktop.matches ? '›' : '‹';
      collapseButton.setAttribute('aria-label', collapsed ? 'Menüyü genişlet' : 'Menüyü daralt');
      collapseButton.setAttribute('aria-expanded', String(!collapsed || !desktop.matches));
    }

    applySidebarState();
    desktop.addEventListener('change', applySidebarState);

    const navigation = sidebar.querySelector('.sidebar-nav');
    if (navigation) {
      const addNavigationTitles = function () {
        navigation.querySelectorAll('.nav-item').forEach(function (item) {
          if (!item.hasAttribute('title')) {
            item.setAttribute('title', item.textContent.trim());
          }
        });
      };
      addNavigationTitles();
      new MutationObserver(addNavigationTitles).observe(navigation, { childList: true, subtree: true });
    }
  }
})();
