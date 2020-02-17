import { combineReducers } from "redux";
import counter from "./counter";
import { postsByReddit, selectedReddit } from "./reddit";

const rootReducer = combineReducers({
  counter,
  postsByReddit,
  selectedReddit
});

export default rootReducer;
