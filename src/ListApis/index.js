const ApiGetProduct =  (id = null)=>{
    return{
        Nopraram : "http://localhost/backendBanQuanAo/products/ResfullProduct.php",
        Yespramram:`http://localhost/backendBanQuanAo/products/ResfullProduct.php?id=${id}`
    }
}
  
export {ApiGetProduct}