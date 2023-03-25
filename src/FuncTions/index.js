
const addCommas = (value) => {
  const stringFormat = `${value}`;
  const x = stringFormat.split(".");
  let x1 = x[0];
  const x2 = x.length > 1 ? `.${x[1]}` : "";
  const regex = /(\d+)(\d{3})/;
  while (regex.test(x1)) {
    x1 = x1.replace(regex, "$1,$2");
  }
  return x1 + x2;
};
const truncateString = (str, maxLength) => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  } else {
    return str;
  }
};
const removeVietnameseTones = (str) => {
  // Chuyển chuỗi thành chữ thường
  str = str.toLowerCase();

  // Loại bỏ dấu từng ký tự trong chuỗi
  const map = {
    a: "áàảãạăắằẳẵặâấầẩẫậ",
    d: "đ",
    e: "éèẻẽẹêếềểễệ",
    i: "íìỉĩị",
    o: "óòỏõọôốồổỗộơớờởỡợ",
    u: "úùủũụưứừửữự",
    y: "ýỳỷỹỵ",
  };

  for (let key in map) {
    str = str.replace(new RegExp(`[${map[key]}]`, "g"), key);
  }

  return str;
};
const GetDate = (data) => {
  const d = new Date(data);
  const Datec = d.getDate() >= 10 ? d.getDate() : `0${d.getDate()}`;
  const Monthc =
    d.getMonth() + 1 >= 10 ? d.getDate() + 1 : `0${d.getMonth() + 1}`;
  return `${Datec}-${Monthc}-${d.getFullYear()}`;
};

const GetTime = (data) => {
  const d = new Date(data);
  const Hours = d.getHours() >= 10 ? d.getHours() : `0${d.getHours()}`;
  const Minutes = d.getMinutes() >= 10 ? d.getMinutes() : `0${d.getMinutes()}`;
  return `${Hours}:${Minutes}`;
};

const isURL = (str) => {
  const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
  return pattern.test(str);
};
export {
  addCommas,
  truncateString,
  removeVietnameseTones,
  isURL,
  GetDate,
  GetTime,
};
