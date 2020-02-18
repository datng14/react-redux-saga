import _products from "./products";

const TIMEOUT = 1000;
const MAX_ITEMS = 2;

export const api = {
  getProducts() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(_products);
      }, TIMEOUT);
    });
  },

  buyProduct(cart) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Object.keys(cart.quantityById).length < MAX_ITEMS) {
          resolve(cart);
        } else {
          reject(`You can buy ${MAX_ITEMS} items maximum in a checkout`);
        }
      }, TIMEOUT);
    });
  }
};
