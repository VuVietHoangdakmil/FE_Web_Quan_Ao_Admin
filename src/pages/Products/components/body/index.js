import {
  ListProductSlector,
  valueInputSearchSlector,
  ListSeacrhSlector,
} from "../../../../redux/selectors";
import { ApiGetProduct, ApiGetSize } from "../../../../ListApis";
import {
  uploadDataApi,
  UpdateInput,
  DeleteSelectProduct,
} from "../../../../redux/actions";
import { addCommas } from "../../../../FuncTions";
import { EDIT, REMOVE } from "../../../../types";
import styles from "./bodyStyles.module.scss";
import context from "../../context";

import { Row, Col } from "react-bootstrap";
import lodash from "lodash";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faEdit,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, Fragment, useState, memo, useContext } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";

const RowProducts = ({
  id,
  name,
  size,
  pucharsePrice,
  Price,
  img,
  category,
  idCategory,
  ListCheck,
  setListCheck,
}) => {
  const { setHidenForm, setType, setIdProduct } = useContext(context);
  const sizes = size.map((item, index, arr) => (
    <span key={item.MA_SIZE}>
      {arr.length - 1 === index ? item.TEN_SIZE : `${item.TEN_SIZE}, `}
    </span>
  ));
  const Dispatch = useDispatch();
  const HandelerEdit = () => {
    setIdProduct(id);
    setHidenForm(true);
    setType(EDIT);
    Dispatch(
      UpdateInput({
        name,
        category: idCategory,
        PurchasePrice: pucharsePrice,
        Price,
      })
    );
  };
  const HandelerListCheck = () => {
    if (!ListCheck.includes(id)) {
      setListCheck((p) => [...p, id]);
    } else {
      setListCheck((p) => {
        const deletecheck = (item) => item !== id;
        return p.filter(deletecheck);
      });
    }
  };
  const HandelerDeltete = () => {
    console.log(id);
    setIdProduct(id);
    setHidenForm(true);
    setType(REMOVE);
    Dispatch(
      UpdateInput({
        name,
        category: idCategory,
        PurchasePrice: pucharsePrice,
        Price,
      })
    );
  };
  
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={ListCheck.includes(id)}
          className={styles.CheckBoxCss}
          onChange={HandelerListCheck}
        />
      </td>
      <td>{name}</td>
      <td>{category}</td>
      <td>{sizes}</td>
      <td>{addCommas(pucharsePrice)} đ</td>
      <td>{addCommas(Price)} đ</td>
      <td>
        <img className={styles.tdImg} src={`../../img/imgProduct/${img}`} />
      </td>
      <td>
        <button className={styles.btnRmove} onClick={HandelerDeltete}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
        <button className={styles.btnEdit} onClick={HandelerEdit}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
      </td>
    </tr>
  );
};

function Body() {
  //
  const _ = lodash;
  const ListColTitle = [
    { id: 1, name: "Name" },
    { id: 7, name: "Category" },
    { id: 2, name: "Size" },
    { id: 3, name: "Purchase price" },
    { id: 4, name: "Price" },
    { id: 5, name: "Image" },
    { id: 6, name: "Action" },
  ];
  const [ListCheck, setListCheck] = useState([]);
  const ListProducts = useSelector(ListProductSlector);
  const ListProductsSearch = useSelector(ListSeacrhSlector);
  const valueSearch = useSelector(valueInputSearchSlector);
  const Dispatch = useDispatch();
  const [curentPage, setcurentPage] = useState(0);
  const ListProductsC =
    valueSearch.length > 0 ? ListProductsSearch : ListProducts;

  // fuction
  function FproductCustom(ListProducts, ListSize) {
    return ListProducts.map((product) => {
      const ListSizeBox = ListSize.filter(
        (Size) => Size.MA_SP === product.MA_SP
      );

      return {
        ...product,
        ListSize: ListSizeBox,
      };
    });
  }
  function DleleteSelect() {
    const start = async () => {
      const httpDeleteSelect = await ApiGetProduct().deleleteSelect;
      const heder = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };
      const body = { ListId: JSON.stringify(ListCheck) };
      try {
        const { data } = await axios.post(httpDeleteSelect, body, heder);
        if (data.success) {
          alert("xóa thành công");
          Dispatch(DeleteSelectProduct(data.result));
        } else {
          alert("xóa thất bại");
        }
      } catch (e) {
        alert("Error: " + e.message);
      }
    };
    if (ListCheck.length > 0) {
      if (
        window.confirm(`Bạn có muốn xóa ${ListCheck.length} sản phẩm này ? `)
      ) {
        start();
      }
    } else {
      alert("Vui lòng chọn sản phẩm cần xóa");
    }
  }
  // fuction

  // PageNation
  const numberpage = 6;
  const pageCount = Math.ceil(ListProductsC.length / numberpage);
  const startPage = curentPage * numberpage;
  const endPage = startPage + numberpage;
  const ListProductsPagiNation = ListProductsC.slice(startPage, endPage);
  // PageNation

  const handlePageClick = ({ selected }) => {
    setcurentPage(selected);
  };

  useEffect(() => {
    const Getapi = async () => {
      try {
        const api = ApiGetProduct().Nopraram;
        const api2 = ApiGetSize().Nopraram;
        const reponse = await axios.all([axios.get(api), axios.get(api2)]);
        const [products, Sizes] = reponse;

        const ListProductsCustom = FproductCustom(
          products.data.result,
          Sizes.data.result
        );
        Dispatch(uploadDataApi(ListProductsCustom));
      } catch (err) {
        alert(err.message);
      }
    };
    Getapi();
  }, []);
  useEffect(() => {
    if (ListProductsSearch.length > 0) {
      console.log("re-rendering products");
      setcurentPage(0);
    }
  }, [ListProductsSearch]);
  
  return (
    <div className={styles.wrapper}>
      <Table responsive className="table table-borderless">
        <thead>
          <tr className="table-success">
            <th>
              <input type="checkbox" className={styles.CheckBoxCss} />
            </th>
            {ListColTitle.map((item) => (
              <th key={item.id}>{item.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ListProductsPagiNation.map((item) => (
            <Fragment key={item.MA_SP}>
              <RowProducts
                id={item.MA_SP}
                name={item.TEN_SP}
                size={item.ListSize}
                pucharsePrice={item.GIA_MUA}
                Price={item.GIA_BAN}
                img={item.HINH_SP}
                category={item.TEN_LOAI}
                idCategory={item.MA_LOAI}
                ListCheck={ListCheck}
                setListCheck={setListCheck}
              />
            </Fragment>
          ))}
        </tbody>
      </Table>
      <Row>
        <Col>
          <button onClick={DleleteSelect} className={styles.RemoveSelect}>
            Delete
          </button>
        </Col>
        <Col className={styles.customCol}>
          <ReactPaginate
            breakLabel="..."
            previousLabel={
              <FontAwesomeIcon icon={faChevronLeft} className="nextcustom" />
            }
            nextLabel={
              <FontAwesomeIcon icon={faChevronRight} className="prevcustom" />
            }
            onPageChange={handlePageClick}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
            forcePage={curentPage}
            activeClassName="active"
            className="pagenationCSS"
          />
        </Col>
      </Row>
    </div>
  );
}

export default memo(Body);
