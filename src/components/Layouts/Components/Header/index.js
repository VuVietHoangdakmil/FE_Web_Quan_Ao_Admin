import styles from "./Header.module.scss";
import Input from "../../../Input";
import { LocalSettingCol } from "../../../../redux/actions";

import { memo, useRef, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import {
  faSliders,
  faMagnifyingGlass,
  faMessage,
  faTimes,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Message = memo(({ setHidenMessages, Active, ClickRemove }) => {
  const ListUser = [
    {
      id: 1,
      img: "https://www.kanpai.fr/sites/default/files/styles/og/public/naruto-tag.jpg",
    },
    {
      id: 2,
      img: "https://www.kanpai.fr/sites/default/files/styles/og/public/naruto-tag.jpg",
    },
    {
      id: 3,
      img: "https://www.kanpai.fr/sites/default/files/styles/og/public/naruto-tag.jpg",
    },
  ];
  const ListMes = [
    {
      id: 1,
      img: "https://www.kanpai.fr/sites/default/files/styles/og/public/naruto-tag.jpg",
      Message: "okokasdasdasdadadsadsadsasd",
    },
    {
      id: 2,
      img: "https://www.kanpai.fr/sites/default/files/styles/og/public/naruto-tag.jpg",
      Message: "asd",
    },

    {
      id: 3,
      img: "https://www.kanpai.fr/sites/default/files/styles/og/public/naruto-tag.jpg",
      Message: "okokasdasdasdadadsadsadsasdádadsadadasd",
    },
  ];

  useEffect(() => {
    let id;
    if (Active) {
      id = setTimeout(() => {
        setHidenMessages(false);
      }, 300);
    }
    return () => {
      clearTimeout(id);
    };
  }, [Active]);

  return (
    <div
      className={clsx(styles.contentMess, {
        [styles.activeAnimation]: Active,
      })}
    >
      <header>
        <div className={styles.Header}>
          <div className={styles.HeaderL}>
            <h4>Chat With Us</h4>
            <div>
              {ListUser.map((item) => (
                <img key={item.id} width="40px" src={item.img} />
              ))}
            </div>
          </div>
          <div className={styles.HeaderR} onClick={ClickRemove}>
            <FontAwesomeIcon icon={faTimes} className={styles.removeMess} />
          </div>
        </div>
      </header>

      <div className={styles.textMess}>
        <h2>Sunday, 12 ,January</h2>
        <ul>
          {ListMes.map((item) => (
            <li key={item.id} className={clsx({ [styles.active]: false })}>
              <div className={styles.licon}>
                <img src={item.img} className={styles.avtarMessTex} />
                <div className={styles.boxMessage}>
                  <p>{item.Message}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.GroupInputMess}>
        <input placeholder="mess..." />

        <FontAwesomeIcon icon={faPlus} className={styles.addMess} />
      </div>
    </div>
  );
});

const Boxul = () => {
  const Lists = [
    { id: 1, path: "", name: "MyProfile" },
    { id: 2, path: "", name: "Setting" },
    { id: 3, path: "", name: "Logout" },
  ];
  return (
    <ul>
      {Lists.map(({ path, name, id }) => (
        <li key={id}>
          <Link path={path}>{name}</Link>
        </li>
      ))}
    </ul>
  );
};

function Header() {
  const dispatch = useDispatch();
  const domSeacrh = useRef({});
  const [IsHidenInput, setIshidenInput] = useState(false);
  const [HidenMessages, setHidenMessages] = useState(false); //
  const [Active, setActive] = useState(false);
  const HanderlerRomveDom = (e) => {
    const dk =
      domSeacrh.current.domInput &&
      domSeacrh.current.domIconTk &&
      !domSeacrh.current.domInput.contains(e.target) &&
      !domSeacrh.current.domIconTk.contains(e.target);

    if (dk) {
      setIshidenInput(false);
    }
  };
  const HanderlerRomveDom2 = (e) => {
    const dk =
      domSeacrh.current.domMess &&
      !domSeacrh.current.domMess.contains(e.target);
    if (dk) {
      setActive(true);
    }
  };
  const hidenForm = () => {
    setHidenMessages(true);
    setActive(false);
  };
  const ClickRemove = (e) => {
    e.stopPropagation();
    setActive(true);
  };

  useEffect(() => {
    document.addEventListener("click", HanderlerRomveDom);

    return () => {
      document.removeEventListener("click", HanderlerRomveDom);
    };
  }, []);
  useEffect(() => {
    document.addEventListener("click", HanderlerRomveDom2);

    return () => {
      document.removeEventListener("click", HanderlerRomveDom2);
    };
  }, []);

  return (
    <Nav className={styles.warraper}>
      <div className={styles.Container}>
        <Row className={styles.Row}>
          <Col>
            <div
              className={styles.iconToggole}
              onClick={() => dispatch(LocalSettingCol())}
            >
              <FontAwesomeIcon icon={faSliders} />
            </div>
          </Col>
          <Col>
            <div className={styles.BoxAction}>
              <div className={styles.BoxActionRow}>
                <div className={clsx(styles.BoxIcon)}>
                  {IsHidenInput && (
                    <Input
                      ref={domSeacrh}
                      placeholder="Tìm Kiếm"
                      heigth="100px"
                    />
                  )}

                  <FontAwesomeIcon
                    ref={(dom) => (domSeacrh.current.domIconTk = dom)}
                    icon={faMagnifyingGlass}
                    className={styles.iconSearch}
                    onClick={() => {
                      setIshidenInput(true);
                    }}
                  />
                </div>
                <div
                  className={styles.BoxIcon}
                  ref={(dom) => (domSeacrh.current.domMess = dom)}
                  onClick={hidenForm}
                >
                  <FontAwesomeIcon icon={faMessage} className={styles.Mess} />
                  <span className={styles.quality}>2</span>
                  {HidenMessages && (
                    <Message
                      setHidenMessages={setHidenMessages}
                      Active={Active}
                      ClickRemove={ClickRemove}
                    />
                  )}
                </div>
                <div
                  className={clsx(
                    styles.BoxIcon,
                    styles.BoxIconHver,
                    styles.zindex
                  )}
                >
                  <img src="data:image/jpeg;base64,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" />
                  <div className={styles.BoxIconHover}>
                    <header>
                      <span>admin</span>
                      <h1>Vũ Viết Hoàng</h1>
                    </header>
                    <Boxul />
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Nav>
  );
}

export default memo(Header);
