import Axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const ENDPOINT = "http://internetrelaychatback.herokuapp.com/";
export const ENDPOINTFORWS = "ws://internetrelaychatback.herokuapp.com/";
export async function callService(path, method, data, login = false) {
  if (login) {
    return await Axios({
      url: ENDPOINT + "api" + path,
      method: method,
      data: data,
    });
  }

  return await Axios({
    url: ENDPOINT + "api" + path,
    method: method,
    data: data,
    headers: { Authorization: `Bearer ${cookies.get("accessToken")}` },
  });
}

export async function callGiphy(url) {
  return await Axios({
    url,
    method: "GET",
  });
}
