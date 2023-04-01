import styles from "./SliderBar.module.scss";
import { getLocalStorage } from "../../../../LocalStorage";
import { XlColSlector } from "../../../../redux/selectors";

import { Link, useLocation } from "react-router-dom";
import { memo, useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import {
  faShirt,
  faHome,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
function SliderBar() {
  const ListItemsdata = [
    {
      id: 1,
      name: "Home",
      icon: faHome,
      Path: "/",
      active: false,
      toggle: false,
    },
    {
      id: 2,
      name: "Product",
      icon: faShirt,
      active: false,
      toggle: true,
      ListCon: [
        {
          id: 1,
          name: "Product",
          icon: faShirt,
          Path: "/Product",
          active: false,
        },
        {
          id: 2,
          name: "Productc",
          icon: faShirt,
          Path: "",
          active: false,
        },
        {
          id: 3,
          name: "Product7",
          icon: faShirt,
          Path: "",
          active: false,
        },
      ],
    },
  ];
  useSelector(XlColSlector);

  const { pathname } = useLocation();
  const [ListItems, setListItems] = useState(ListItemsdata);
  const { isToggle } = getLocalStorage("isCol") ?? true;

  const HanderlerClick = (id, toggle) => {
    setListItems((arr) => {
      return arr.map((item) => {
        if (toggle) {
          return item.id === id
            ? { ...item, active: !item.active }
            : { ...item, active: false };
        } else {
          return item.id === id
            ? { ...item, active: true }
            : { ...item, active: false };
        }
      });
    });
  };
  return (
    <div className={clsx(styles.wrapper, { [styles.active]: isToggle })}>
      <h2>HOANG</h2>
      <ul className={styles.boxUL}>
        {ListItems.map((ListItem) => (
          <Fragment key={ListItem.id}>
            <li
              className={clsx(
                { [styles.active]: ListItem.active },
                { [styles.LiconCss]: ListItem.active && ListItem.toggle }
              )}
              onClick={() => {
                HanderlerClick(ListItem.id, ListItem.toggle);
              }}
            >
              <Link to={ListItem.Path}>
                <div className={styles.wrapperIconContent}>
                  <FontAwesomeIcon
                    icon={ListItem.icon}
                    className={styles.classIcon}
                  />
                  <span
                    className={clsx(styles.noneCol, {
                      [styles.active]: ListItem.active && ListItem.toggle,
                    })}
                    id={`${
                      ListItem.active && ListItem.toggle ? styles.NoBoder : ""
                    }`}
                  >
                    {ListItem.name}
                  </span>
                </div>
                {ListItem.toggle && (
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className={clsx(styles.iconArow, styles.noneCol1, {
                      [styles.active]: ListItem.active,
                    })}
                  />
                )}
              </Link>
            </li>
            <div
              className={clsx(styles.ulCon, {
                [styles.active]: ListItem.active && ListItem.toggle,
              })}
            >
              {ListItem.ListCon &&
                ListItem.ListCon.map((item, index) => (
                  <li
                    key={index}
                    className={clsx({ [styles.active]: item.Path == pathname })}
                  >
                    <Link to={item.Path}>
                      <FontAwesomeIcon
                        icon={item.icon}
                        className={clsx(styles.classIcon)}
                        id={styles.iconIcon}
                      />
                      {ListItem.name}
                    </Link>
                  </li>
                ))}
            </div>
          </Fragment>
        ))}
      </ul>
    </div>
  );
}

export default memo(SliderBar);
