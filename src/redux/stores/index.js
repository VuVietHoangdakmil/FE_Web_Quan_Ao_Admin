import { createStore } from "@reduxjs/toolkit";
import { localWebReducer, productsReducer } from "../reducers";

const storeLocal = createStore(localWebReducer);
const storeProducts = createStore(productsReducer);
export { storeLocal, storeProducts };
