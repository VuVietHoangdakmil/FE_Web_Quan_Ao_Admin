import styles from "./Header.module.scss";
import { InputNoRef } from "../../../../components/Input";

import { useState } from "react";
import clsx from "clsx";
import { valueInputSearchSlector } from "../../../../redux/selectors";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
function Header({ title }) {
  const valueSearch = useSelector(valueInputSearchSlector);
  console.log(valueSearch);
  return (
    <div className={styles.wrapper}>
      <h2> Data {title}</h2>
      <Row className={styles.RowAction}>
        <Col>
          <span className={styles.TitleTable}>{title}</span>
        </Col>
        <Col>
          <Row>
            <Col xl={9} lg={9} md={9} className={styles.ColInput}>
              <InputNoRef placeholder="seacrh" />
            </Col>
            <Col xl={3} lg={3} md={3} className={styles.ColBtn}>
              <button>Add new</button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Header;
