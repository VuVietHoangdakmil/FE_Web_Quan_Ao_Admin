import { createStore, configureStore } from "@reduxjs/toolkit";
import { localWebReducer, productsReducer } from "../reducers";

const storeLocal = createStore(localWebReducer);
// const storeProducts = createStore(productsReducer);
const storeProducts = configureStore({
  reducer:productsReducer,
});
export { storeLocal, storeProducts };
