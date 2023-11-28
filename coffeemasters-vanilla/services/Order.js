import { getProductById } from './Menu';

export async function addToCart(id) {
  const product = await getProductById(id);

  const results = app.store.cart.filter(
    (productInCart) => productInCart.product.id === id
  );

  const productAlreadyInCart = results.length === 1;

  if (productAlreadyInCart) {
    // Update the current Item
    app.store.cart = app.store.cart.map((product) => {
      return product.product.id === id
        ? { ...product, quantity: product.quantity + 1 }
        : product;
    });
  } else {
    // add new product
    app.store.cart = [...app.store.cart, { product, quantity: 1 }];
  }
}

export function removeFromCart(id) {
  app.store.cart = app.store.cart.filter(
    (product) => product.product.id !== id
  );
}
