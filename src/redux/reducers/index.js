import { LOCAL_SETTING_COL, GET_DATE_APIS } from "../env";
import { setLocalStorage, getLocalStorage } from "../../LocalStorage";

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
  ListProduct: [],
};
const productsReducer = (state = dataProducts, action) => {
  switch (action.type) {
    case GET_DATE_APIS:
      return {
        ...state,
        ListProduct: [...action.payload],
      };

    default:
      return state;
  }
};
export { localWebReducer, productsReducer };
