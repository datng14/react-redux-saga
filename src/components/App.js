import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./home/HomePage";
import Counter from "./counter/Counter";
import Header from "./Header";
import Reddit from "./reddit/Reddit";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/counter" component={Counter} />
        <Route path="/reddit" component={Reddit} />
      </Switch>
    </div>
  );
}

export default App;
