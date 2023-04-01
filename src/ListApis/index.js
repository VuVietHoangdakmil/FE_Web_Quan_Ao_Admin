const ApiGetProduct = (id = null) => {
  return {
    Nopraram:
      "http://localhost/backendBanQuanAo/GetProductAdmin/ResfullProductadmin.php",
    Yespramram: `http://localhost/backendBanQuanAo/GetProductAdmin/ResfullProductadmin.php?id=${id}`,
    update: `http://localhost/backendBanQuanAo/GetProductAdmin/UpdateProduct.php?id=${id}`,
    deleleteSelect: `http://localhost/backendBanQuanAo/GetProductAdmin/DeleteProduct.php`,
  };
};

const ApiGetSize = (id = null) => {
  return {
    Nopraram: "http://localhost/backendBanQuanAo/Size/resFullSize.php",
    Yespramram: `http://localhost/backendBanQuanAo/Size/resFullSize.php?id=${id}`,
  };
};
const ApiGetLoai = (id = null) => {
  return {
    Nopraram: "http://localhost/backendBanQuanAo/LoaiSp/ResfullLoaiSp.php",
    Yespramram: `http://localhost/backendBanQuanAo/LoaiSp/ResfullLoaiSp.php?id=${id}`,
  };
};

export { ApiGetProduct, ApiGetSize, ApiGetLoai };
