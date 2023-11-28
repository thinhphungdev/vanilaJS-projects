import { getProductById } from './Menu';

export async function addToCart(id) {
  const product = await getProductById(id);

  const results = app.store.cart.filter(
    (productInCart) => productInCart.product.id === id
  );

  const productAlreadyInCart = results.length === 1;

  if (!productAlreadyInCart) {
    app.store.cart;
    return;
  }
}
