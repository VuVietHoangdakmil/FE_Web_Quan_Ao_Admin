import styles from "./FromStyles.module.scss";
import { InputNoRef } from "../../../../components/Input";
import { ListValueSlector } from "../../../../redux/selectors";
import {
  onChangeListInput,
  AddProduct,
  UpdateProduct,
  DeleteProduct,
} from "../../../../redux/actions";
import { ApiGetLoai, ApiGetProduct } from "../../../../ListApis";
import { ADD, EDIT, REMOVE } from "../../../../types";
import context from "../../context";

import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect, useState, useContext } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";

function From({ setHidenForm, type }) {
  //variable....................................
  const domForm = useRef();
  const domInpytfILE = useRef();
  const [fileImg, setfileImg] = useState(null);
  const [ListLoaiSp, setListLoaiSp] = useState([]);
  const Dispatch = useDispatch();
  const ListInput = useSelector(ListValueSlector);
  const { name, category, PurchasePrice, Price } = ListInput;
  const { IdProduct } = useContext(context);

  const contentBtn =
    type === ADD
      ? "Add Product"
      : type === EDIT
      ? "Edit Product"
      : "Delete Product";
  const title =
    type === ADD
      ? "Add Product"
      : type === EDIT
      ? "Edit Product"
      : "Delete Product";
  //variable.....................................

  useEffect(() => {
    console.log(domInpytfILE.current.value);
  });
  const HandelerChange = (e) => {
    const { name, value } = e.target;
    let value2 = value.length <= 1 ? value.trim() : value;
    Dispatch(onChangeListInput({ name, value: value2 }));
  };

  const HandelerChangeIMG = (e) => {
    setfileImg(e.target.files[0]);
  };
  const RomoveForm = (e) => {
    if (domForm.current && !domForm.current.contains(e.target)) {
      console.log("cay");
      setHidenForm(false);
    } else {
      console.log("ko tat");
    }
  };
  const HanderlerSubMit = (e) => {
    e.preventDefault();
    const startDelete = async () => {
      try {
        const httpProduct = ApiGetProduct(IdProduct).Yespramram;
        const { data } = await axios.delete(httpProduct);
        if (data.success) {
          const { id } = data.result;
          Dispatch(DeleteProduct(id));
          setHidenForm(false);
          alert("xoa thanh cong");
        } else {
          alert("xoa khong thanh cong");
        }
      } catch (e) {
        alert(e.message);
      }
    };

    if (type === REMOVE) {
      if (window.confirm("Ban co muon xoa")) {
        startDelete();
      }
    } else if (type === ADD) {
      const DK = Object.values(ListInput).some((item) => item === "");
      if (DK || !!!fileImg) {
        alert("Vui lòng nhập đầy đủ thông tin");
      } else {
        const startAdd = async () => {
          try {
            const httpProduct = ApiGetProduct().Nopraram;
            const formData = new FormData();
            formData.append("fileToUpload", fileImg);
            formData.append("name", name);
            formData.append("category", category);
            formData.append("PurchasePrice", PurchasePrice);
            formData.append("Price", Price);

            const hearder = {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            };
            const { data } = await axios.post(httpProduct, formData, hearder);

            if (data.success) {
              alert("Thêm Thành Công");
              Dispatch(AddProduct(data.result));
            } else {
              alert("Không Thêm Được Sản Phẩm");
            }
          } catch (e) {
            alert(e.message);
          }
        };

        startAdd();
      }
    } else {
      const startEdit = async () => {
        try {
          const kt = fileImg ? false : true;
          const httpProduct = ApiGetProduct(IdProduct).update;
          const formData = new FormData();
          formData.append("isKt", kt);
          formData.append("fileToUpload", fileImg);
          formData.append("name", name);
          formData.append("category", category);
          formData.append("PurchasePrice", PurchasePrice);
          formData.append("Price", Price);

          const hearder = {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          };
          const respone = await axios.post(httpProduct, formData, hearder);
          console.log("kay", respone);
          if (respone.data.success) {
            alert("Câp nhật Thành Công");
            const { PurchasePrice, Price, name, nameImg, id, category } =
              respone.data.result;
            Dispatch(
              UpdateProduct({
                name,
                category,
                Price,
                PurchasePrice,
                nameImg,
                id,
              })
            );
            setHidenForm(false);
          } else {
            alert("Không cập nhật Được Sản Phẩm");
          }
        } catch (e) {
          alert(e.message);
        }
      };
      const DK = Object.values(ListInput).some((item) => item === "");
      if (DK) {
        alert("Vui Lòng Điền Đầy đủ");
      } else {
        startEdit();
      }
      console.log("oknha", DK);
    }
  };
  useEffect(() => {
    const start = async () => {
      try {
        const http = ApiGetLoai().Nopraram;
        const { data } = await axios.get(http);
        setListLoaiSp(data.result);
      } catch (e) {
        alert(e.message);
      }
    };
    start();
  }, []);
  useEffect(() => {
    document.addEventListener("mousedown", RomoveForm);

    return () => {
      document.removeEventListener("mousedown", RomoveForm);
    };
  }, []);

  return (
    <form
      onSubmit={HanderlerSubMit}
      draggable="true"
      className={styles.wrapper}
      ref={domForm}
    >
      <h2>{title}</h2>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column lg="12">
          Name
        </Form.Label>
        <Col lg={12}>
          <InputNoRef name="name" onChange={HandelerChange} value={name} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column lg="12">
          Category
        </Form.Label>
        <Col lg={12}>
          <select
            className={styles.selectCss}
            name="category"
            value={category}
            onChange={HandelerChange}
          >
            <option value="">Vui Lòng Chọn Loại</option>
            {ListLoaiSp.map(({ MA_LOAI, TEN_LOAI }) => (
              <option key={MA_LOAI} value={MA_LOAI}>
                {TEN_LOAI}
              </option>
            ))}
          </select>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column lg="12">
          Purchase price
        </Form.Label>
        <Col lg={12}>
          <InputNoRef
            type="number"
            name="PurchasePrice"
            value={PurchasePrice}
            onChange={HandelerChange}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column lg="12">
          Price
        </Form.Label>
        <Col lg={12}>
          <InputNoRef
            name="Price"
            type="number"
            value={Price}
            onChange={HandelerChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column lg="12">
          Image
        </Form.Label>
        <Col lg={12}>
          <input
            ref={domInpytfILE}
            type="file"
            className={styles.fileCss}
            name="fileImg"
            onChange={HandelerChangeIMG}
          />
        </Col>
      </Form.Group>

      <button>{contentBtn}</button>
    </form>
  );
}

export default From;
