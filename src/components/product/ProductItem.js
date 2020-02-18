import React from "react";
import Product from "./Product";

const ProductItem = ({ product, onAddToCartClicked }) => {
  function addToCartAction() {
    return (
      <button
        onClick={onAddToCartClicked}
        disabled={product.inventory ? 0 : ""}
      >
        {product.inventory > 0 ? "Add To Cart" : "Sold Out"}
      </button>
    );
  }
  return (
    <div>
      <Product
        title={product.title}
        price={product.price}
        action={addToCartAction}
      />
    </div>
  );
};

export default ProductItem;
