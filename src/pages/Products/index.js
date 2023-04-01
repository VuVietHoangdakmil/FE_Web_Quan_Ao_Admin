import styles from "./products.module.scss";
import { storeProducts } from "../../redux/stores";
import Header from "./components/Header";
import Body from "./components/body";
import FormAtion from "./components/FormAciton";
import { ADD, EDIT, REMOVE } from "../../types";
import Context from "./context";

import { useState } from "react";
import { Provider } from "react-redux";

import clsx from "clsx";
function Product() {
  const [HidenForm, setHidenForm] = useState(false);
  const [IdProduct, setIdProduct] = useState(null);
  const [type, setType] = useState(ADD);

  const data = {
    setHidenForm,
    setType,
    IdProduct,
    setIdProduct,
  };

  return (
    <Provider store={storeProducts}>
      <Context.Provider value={data}>
        <div className={clsx(styles.Wrapper)}>
          <Header
            title="Products"
            setHidenForm={setHidenForm}
            setType={setType}
          />
          <Body />
          {HidenForm && (
            <FormAtion
              type={type}
              contentBtn={"Add"}
              setHidenForm={setHidenForm}
            />
          )}
        </div>
      </Context.Provider>
    </Provider>
  );
}

export default Product;
