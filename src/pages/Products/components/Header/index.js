import styles from "./Header.module.scss";
import { InputNoRef } from "../../../../components/Input";
import { onChangeInput, UpdateInput } from "../../../../redux/actions";
import { ADD } from "../../../../types";

import { debounce } from "lodash";
import { valueInputSearchSlector } from "../../../../redux/selectors";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
function Header({ title, setHidenForm, setType }) {
  const Dispatch = useDispatch();
  const valueSearch = useSelector(valueInputSearchSlector);
  const HandlerOnChange = debounce((e) => {
    Dispatch(onChangeInput(e.target.value));
  }, 500);

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
              <InputNoRef
                placeholder="Seacrh Name"
                onChange={HandlerOnChange}
              />
            </Col>
            <Col xl={3} lg={3} md={3} className={styles.ColBtn}>
              <button
                onClick={(e) => {
                  Dispatch(
                    UpdateInput({ name:"", category:"", PurchasePrice:"", Price:"" })
                  );
                  setType(ADD);
                  setHidenForm(true);
                }}
              >
                Add new
              </button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Header;
