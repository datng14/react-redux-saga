import { take, put, fork, call, takeEvery } from "redux-saga/effects";
import { api } from "../../services";
import * as productActions from "../actions/productActions";

export function* getAllProducts() {
  const products = yield call(api.getProducts);
  console.log("all product", products);
  yield put(productActions.receiveProducts(products));
}
