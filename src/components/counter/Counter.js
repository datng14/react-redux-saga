import React from "react";
import { connect } from "react-redux";

const Counter = ({ INCREMENT, DECREMENT, counter }) => {
  return (
    <p>
      Value: {counter} <button onClick={INCREMENT}>+</button>{" "}
      <button onClick={DECREMENT}>-</button>
    </p>
  );
};

const mapStateToProps = state => {
  return {
    counter: state.counter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    INCREMENT: () => dispatch({ type: "INCREMENT" }),
    DECREMENT: () => dispatch({ type: "DECREMENT" })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
