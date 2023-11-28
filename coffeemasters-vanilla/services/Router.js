const Router = {
  init: () => {
    document.querySelectorAll('a.navlink').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        // const url1 = event.target.href;
        const url = event.target.getAttribute('href');
        Router.go(url);
      });
    });
    // Event Handler for URL changes
    window.addEventListener('popstate', (event) => {
      Router.go(event.state.route, false);
    });

    // Check the initial URL
    Router.go(location.pathname);
  },

  go: (route, addToHistory = true) => {
    console.log(`Going to ${route}`);

    if (addToHistory) {
      history.pushState({ route }, '', route);
    }

    const pageElement = Router.createPageElementBasedOnRoute(route, null);

    const mainEl = document.querySelector('main');

    if (!pageElement) {
      return (mainEl.innerHTML = 'Oups, 404!');
    }

    // document.querySelector("main").children[0].remove();
    mainEl.innerHTML = '';
    mainEl.appendChild(pageElement);
    window.scrollX = 0;
    window.scrollY = 0;
  },

  createPageElementBasedOnRoute(route, pageElement = null) {
    switch (route) {
      case '/':
        pageElement = document.createElement('menu-page');
        break;
      case '/order':
        pageElement = document.createElement('order-page');
        break;
      default:
        if (route.startsWith('/product-')) {
          pageElement = document.createElement('details-page');
          const paramId = route.substring(route.lastIndexOf('-') + 1);
          pageElement.dataset.productId = paramId;
        }
    }

    return pageElement;
  },
};
export default Router;
