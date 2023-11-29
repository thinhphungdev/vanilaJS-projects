import Store from './services/Store.js';
import { loadMenu } from './services/Menu.js';
import Router from './services/Router.js';

// Link web component
import { MenuPage } from './components/MenuPage.js';
import { DetailsPage } from './components/DetailsPage.js';
import { OrderPage } from './components/OrderPage.js';
import { ProductItem } from './components/ProductItem.js';
import { CartItem } from './components/CartItem.js';

// Config singleton app
window.app = {};
app.store = Store;
app.router = Router;

window.addEventListener('DOMContentLoaded', init);

window.addEventListener('appcartchange', displayCartBadgeIcon);

function init() {
  loadMenu();
  app.router.init();
}

function displayCartBadgeIcon(event) {
  const badge = document.getElementById('badge');
  const quantity = app.store.cart.reduce((acc, item) => acc + item.quantity, 0);

  badge.textContent = quantity;
  badge.hidden = quantity == 0 ? true : false;
}
