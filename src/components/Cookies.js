import Cookies from "universal-cookie";

const cookies = new Cookies();

const setCookies = (_cookieName, _dataArr) => {
  cookies.set(_cookieName, _dataArr, { path: "/" });
};
const getCookies = (_cookieName) => {
  const myArr = cookies.get(_cookieName);
  return myArr;
};
const updateCookies = (_cookieName, _dataArr) => {
  const myArr = cookies.get(_cookieName);
  if (myArr) {
    const newArr = [...myArr, _dataArr];
    cookies.set(_cookieName, newArr, { path: "/" });
  } else {
    const newArr = [_dataArr];
    cookies.set(_cookieName, newArr, { path: "/" });
  }
};
const checkCookies = (_cookieName) => {
  const mycookies = cookies.get(_cookieName);
  if (mycookies) {
    return true;
  } else {
    return false;
  }
};
export { setCookies, getCookies, updateCookies, checkCookies };
