import {
  LOCAL_SETTING_COL,
  GET_DATE_APIS,
  GET_API_SIZE,
  ON_CHANGE_INPUT,
  ON_CHANGE_INPUTs,
  ADD_PRODUCT,
  UPDATE_INPUT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  DELETE_SELECT_PRODUCT,
} from "../env";

const LocalSettingCol = () => ({
  type: LOCAL_SETTING_COL,
});

const uploadDataApi = (data) => ({
  type: GET_DATE_APIS,
  payload: data,
});

const uploadApiListSize = (data) => ({
  type: GET_API_SIZE,
  payload: data,
});

const onChangeInput = (data) => ({
  type: ON_CHANGE_INPUT,
  payload: data,
});
const onChangeListInput = (data) => ({
  type: ON_CHANGE_INPUTs,
  payload: data,
});
const AddProduct = (data) => ({
  type: ADD_PRODUCT,
  payload: data,
});

const UpdateInput = (data) => ({
  type: UPDATE_INPUT,
  payload: data,
});
const UpdateProduct = (data) => ({
  type: UPDATE_PRODUCT,
  payload: data,
});
const DeleteProduct = (data) => ({
  type: DELETE_PRODUCT,
  payload: data,
});

const DeleteSelectProduct = (data) => ({
  type: DELETE_SELECT_PRODUCT,
  payload: data,
});
export {
  LocalSettingCol,
  uploadDataApi,
  uploadApiListSize,
  onChangeInput,
  onChangeListInput,
  AddProduct,
  UpdateInput,
  UpdateProduct,
  DeleteProduct,
  DeleteSelectProduct,
};
