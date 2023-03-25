import styles from "./products.module.scss";
import { storeProducts } from "../../redux/stores";
import Header from "./components/Header";
import Body from "./components/body";
import { Provider } from "react-redux";


import clsx from "clsx";
function Product() {
  return (
    <Provider store={storeProducts}>
      <div className={clsx(styles.Wrapper)}>
        <Header title="Products" />
        <Body />
      </div>
    </Provider>
  );
}

export default Product;
