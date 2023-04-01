import { removeVietnameseTones } from "../../FuncTions";

import {
  LOCAL_SETTING_COL,
  GET_DATE_APIS,
  GET_API_SIZE,
  ON_CHANGE_INPUT,
  ON_CHANGE_INPUTs,
  ADD_PRODUCT,
  UPDATE_INPUT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  DELETE_SELECT_PRODUCT,
} from "../env";
import { setLocalStorage, getLocalStorage } from "../../LocalStorage";

import { createReducer } from "@reduxjs/toolkit";
const xlCol = {
  left: getLocalStorage("isCol") ? getLocalStorage("isCol").left : 2,
  rigth: getLocalStorage("isCol") ? getLocalStorage("isCol").rigth : 10,
  isToggle: getLocalStorage("isCol")
    ? getLocalStorage("isCol").isToggle
    : false,
};
const dataLocal = {
  xlCol,
};

const localWebReducer = (state = dataLocal, action) => {
  const { xlCol } = state;
  switch (action.type) {
    case LOCAL_SETTING_COL:
      setLocalStorage(
        "isCol",
        xlCol.isToggle
          ? { left: 2, rigth: 10, isToggle: false }
          : { left: 1, rigth: 11, isToggle: true }
      );
      return {
        ...state,
        xlCol: {
          left: xlCol.isToggle ? 2 : 1,
          rigth: xlCol.isToggle ? 10 : 11,
          isToggle: !xlCol.isToggle,
        },
      };
    default:
      return state;
  }
};

//
const dataProducts = {
  valueInputSearch: "",
  ListInput: {
    name: "",
    category: "",
    PurchasePrice: "",
    Price: "",
  },
  ListProduct: [],
  ListSize: [],
  ListSeacrh: [],
};

const productsReducer = createReducer(dataProducts, (builder) => {
  builder
    .addCase(GET_DATE_APIS, (state, action) => {
      state.ListProduct = action.payload;
    })
    .addCase(GET_API_SIZE, (state, action) => {
      state.ListSize = action.payload;
    })
    .addCase(ON_CHANGE_INPUT, (state, action) => {
      const ListSeacrh = state.ListProduct.filter(({ TEN_SP }) =>
        removeVietnameseTones(TEN_SP).includes(
          removeVietnameseTones(action.payload)
        )
      );

      state.valueInputSearch = action.payload;
      state.ListSeacrh = ListSeacrh;
    })
    .addCase(ON_CHANGE_INPUTs, (state, action) => {
      const { ListInput } = state;
      const { payload } = action;
      state.ListInput = { ...ListInput, [payload.name]: payload.value };
    })
    .addCase(UPDATE_INPUT, (state, action) => {
      const { name, category, PurchasePrice, Price } = action.payload;

      state.ListInput = {
        ...state.ListInput,
        name,
        category,
        PurchasePrice,
        Price,
      };
    })
    .addCase(ADD_PRODUCT, (state, action) => {
      const { name, category, Price, PurchasePrice, nameImg, id } =
        action.payload;
      state.ListProduct.unshift({
        GIA_BAN: Price,
        GIA_MUA: PurchasePrice,
        HINH_SP: nameImg,
        ListSize: [],
        MA_LOAI: category,
        MA_SP: id,
        TEN_LOAI: category == 2 ? "QUAN" : "AO",
        TEN_SP: name,
      });
    })
    .addCase(UPDATE_PRODUCT, (state, action) => {
      const { name, category, Price, PurchasePrice, nameImg, id } =
        action.payload;
      const newARR = state.ListProduct.map((product) => {
        if (product.MA_SP == id) {
          const kq = nameImg
            ? {
                ...product,
                GIA_BAN: Price,
                GIA_MUA: PurchasePrice,
                HINH_SP: nameImg,
                ListSize: [],
                MA_LOAI: category,
                TEN_LOAI: category == 2 ? "QUAN" : "AO",
                TEN_SP: name,
              }
            : {
                ...product,
                GIA_BAN: Price,
                GIA_MUA: PurchasePrice,
                ListSize: [],
                MA_LOAI: category,
                TEN_LOAI: category == 2 ? "QUAN" : "AO",
                TEN_SP: name,
              };
          return kq;
        } else {
          return product;
        }
      });
      state.ListProduct = [...newARR];
    })
    .addCase(DELETE_PRODUCT, (state, action) => {
      const id = action.payload;
      const newARR = state.ListProduct.filter((item) => item.MA_SP !== id);
      state.ListProduct = [...newARR];
    })
    .addCase(DELETE_SELECT_PRODUCT, (state, action) => {
      const ListIdDeLeTe = action.payload;
      const newARR = state.ListProduct.filter(
        (item) => ListIdDeLeTe.indexOf(item.MA_SP) == -1
      );
      state.ListProduct = [...newARR];
    });
});
export { localWebReducer, productsReducer };
