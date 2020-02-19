import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const styles = {
    margin: "0 auto",
    textAlign: "center"
  };
  return (
    <div style={styles}>
      <Link to="/">HomePage</Link> |{" "}
      {/* <Link to="/counter">Counter</Link> |{" "} */}
      {/* <Link to="/product-list">Products</Link> | <Link to="/cart">Cart</Link> |{" "} */}
      {/* <Link to="/reddit">Reddit</Link> |  */}
      <Link to="/map-api">MapAPI</Link> | <Link to="/map">Map</Link> |{" "}
      <Link to="/auto-complete">AutoComplete</Link>
      {/* <Link to="/test-map">TestMap</Link> */}
      <Link to="/direction">Direction</Link>
    </div>
  );
};

export default Header;
