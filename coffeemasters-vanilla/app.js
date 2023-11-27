import Store from './services/Store.js';
import { loadMenu } from './services/Menu.js';
import Router from './services/Router.js';

// Link web component
import { MenuPage } from './components/MenuPage.js';
import { DetailsPage } from './components/DetailsPage.js';
import { OrderPage } from './components/OrderPage.js';

window.app = {};
app.store = Store;
app.router = Router;

window.addEventListener('DOMContentLoaded', async function () {
  loadMenu();
  app.router.init();
});
