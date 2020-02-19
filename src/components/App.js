import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./home/HomePage";
// import Counter from "./counter/Counter";
import Header from "./Header";
// import Reddit from "./reddit/Reddit";
// import Cart from "./product/Cart";
// import ProductList from "./product/ProductList";
// import MapContainer from "./MapContainer";
import MapManagement from "./MapManagement";
import MapAPI from "./MapAPI";
import AutoComplete from "./MapAPI/AutoComplete";
import Directions from "./MapAPI/Direction";
// import TestMap from "./TestMap";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/map-api" component={MapAPI} />
        <Route path="/auto-complete" component={AutoComplete} />
        <Route path="/direction" component={Directions} />
        {/* <Route path="/test-map" component={TestMap} /> */}
        {/* <Route path="/counter" component={Counter} /> */}
        {/* <Route path="/cart" component={Cart} />
        <Route path="/product-list" component={ProductList} />
        <Route path="/reddit" component={Reddit} /> */}
        <Route path="/map" component={MapManagement} />
      </Switch>
    </div>
  );
}

export default App;
