const Router = {
  init: function () {
    // get all link on the webpage
    // Loop through and attach event listener to them
    document.querySelectorAll('a.navlink').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        // const url1 = event.target.href;
        const url = event.target.getAttribute('href');
        Router.go(url);
      });
    });

    // Event listener for URL changes
    window.addEventListener('popstate', (event) => {
      Router.go(event.state.route, false);
    });

    // Check the initial URL
    if (location.pathname) {
      Router.go(location.pathname);
    }
  },
  go: function (route, addToHistory = true) {
    console.log(`Going to ${route}`);

    if (addToHistory) {
      history.pushState({ route }, '', route);
    }

    let pageElement;

    switch (route) {
      case '/':
        pageElement = document.createElement('h1');
        pageElement.textContent = 'Menu';
        break;
      case '/order':
        pageElement = document.createElement('h1');
        pageElement.textContent = 'Your order';
        break;
      default:
        if (route.startWith('product-')) {
          pageElement = document.createElement('h1');
          pageElement.textContent = 'Details';
          const paramsId = route.substring(route.lastIndexOf('-') + 1);

          pageElement.dataset.id = paramsId;
        }
    }

    const mainContainer = document.querySelector('main');
    mainContainer.innerHTML = '';
    // mainContainer.children.at(0).remove();
    mainContainer.appendChild(pageElement);
    window.scrollX = 0;
    window.scrollY = 0;
  },
};

export default Router;
