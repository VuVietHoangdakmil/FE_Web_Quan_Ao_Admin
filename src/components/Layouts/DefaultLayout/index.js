import { XlColSlector } from "../../../redux/selectors";
import Header from "../Components/Header";
import SliderBar from "../Components/SliderBar";
import styles from "./Default.module.scss";

import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { memo } from "react";

function DefaultLayout({ children }) {
  const { left, rigth } = useSelector(XlColSlector);
  return (
    <div>
      <div className={styles.wrapper}>
        <Row>
          <Col xs={3} xl={left} className="RestCOL">
            <div className={styles.ColLeft}>
              <SliderBar />
            </div>
          </Col>
          <Col xs={8} xl={rigth} className="RestCOL">
            <div className={styles.ColRigth}>
              <Header />
              {children}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default memo(DefaultLayout);
