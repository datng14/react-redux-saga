import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const styles = {
    margin: "0 auto",
    textAlign: "center"
  };
  return (
    <div style={styles}>
      <Link to="/">HomePage</Link> | <Link to="/counter">Counter</Link> |{" "}
      <Link to="/reddit">Reddit</Link>
    </div>
  );
};

export default Header;
