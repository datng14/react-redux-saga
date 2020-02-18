import React from "react";
import { getVisibleProducts } from "../../redux/reducers/products";
import { connect } from "react-redux";
import ProductItem from "./ProductItem";
import { addToCart } from "../../redux/actions/productActions";

const ProductList = ({ products, addToCart }) => {
  return (
    <div>
      <h3>Products</h3>
      {products.map(product => (
        <ProductItem
          key={product.id}
          product={product}
          onAddToCartClicked={addToCart(product.id)}
        />
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  debugger;
  return {
    products: getVisibleProducts(state.products)
  };
};

const mapDispatchToProps = {
  addToCart
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
