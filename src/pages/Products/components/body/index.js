import { ListProductSlector } from "../../../../redux/selectors";
import { ApiGetProduct } from "../../../../ListApis";
import { uploadDataApi } from "../../../../redux/actions";
import { addCommas } from "../../../../FuncTions";

import styles from "./bodyStyles.module.scss";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faEdit,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, Fragment, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";

const RowProducts = ({ id, name, size, pucharsePrice, Price, img }) => {
  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>{name}</td>
      <td>{name}</td>
      <td>{addCommas(pucharsePrice)} đ</td>
      <td>{addCommas(Price)} đ</td>
      <td>
        <img
          className={styles.tdImg}
          src="data:image/jpeg;base64,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"
        />
      </td>
      <td>
        <button className={styles.btnRmove}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
        <button className={styles.btnEdit}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
      </td>
    </tr>
  );
};

function Body() {
  const ListColTitle = [
    { id: 1, name: "Name" },
    { id: 2, name: "Size" },
    { id: 3, name: "Purchase price" },
    { id: 4, name: "Price" },
    { id: 5, name: "Image" },
    { id: 6, name: "Action" },
  ];
  const ListProducts = useSelector(ListProductSlector);
  const Dispatch = useDispatch();
  const [curentPage, setcurentPage] = useState(0);
  const ListProductsC = ListProducts;

  // PageNation

  const numberpage = 7;
  const pageCount = Math.ceil(ListProductsC.length / numberpage);
  const startPage = curentPage * numberpage;
  const endPage = startPage + numberpage;
  const ListProductsPagiNation = ListProductsC.slice(startPage, endPage);

  const dataPagiNaTION = ListProductsPagiNation;
  // PageNation

  const handlePageClick = ({ selected }) => {
    setcurentPage(selected);
  };
  useEffect(() => {
    const Getapi = async () => {
      try {
        const api = ApiGetProduct().Nopraram;
        const { data } = await axios.get(api);
        Dispatch(uploadDataApi(data.result));
      } catch (err) {
        alert(err.message);
      }
    };
    Getapi();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Table responsive className="table table-borderless">
        <thead>
          <tr className="table-success">
            <th>
              <input type="checkbox" />
            </th>
            {ListColTitle.map((item) => (
              <th key={item.id}>{item.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataPagiNaTION.map((item) => (
            <Fragment key={item.MA_SP}>
              <RowProducts
                id={item.MA_SP}
                name={item.TEN_SP}
                size={item.MA_LOAI}
                pucharsePrice={item.GIA_MUA}
                Price={item.GIA_BAN}
                img={""}
              />
            </Fragment>
          ))}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        previousLabel={<FontAwesomeIcon icon={faChevronLeft}  className="nextcustom"/>  }
        nextLabel={<FontAwesomeIcon icon={faChevronRight} className="prevcustom" />  }
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        forcePage={curentPage}
        activeClassName="active"
        className="pagenationCSS"
      />
    </div>
  );
}

export default Body;
