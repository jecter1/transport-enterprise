import axios from "axios";

export default function getData(url, setter, urlparams) {
  axios.get(url, { params: urlparams }).then(res => {setter(res.data); console.log(res.data)});
}
