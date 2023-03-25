import { LOCAL_SETTING_COL, GET_DATE_APIS } from "../env";

const LocalSettingCol = () => ({
  type: LOCAL_SETTING_COL,
});

const uploadDataApi = (data) => ({
  type: GET_DATE_APIS,
  payload: data,
});
export { LocalSettingCol, uploadDataApi };
