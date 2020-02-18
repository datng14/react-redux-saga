import React from "react";

const Product = ({ title, price, quantity, action }) => {
  return (
    <div>
      {title} - &#36;{price} {quantity ? `x ${quantity}` : null} {action}
    </div>
  );
};

export default Product;
