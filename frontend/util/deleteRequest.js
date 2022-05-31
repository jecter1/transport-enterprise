import axios from "axios";

export default function deleteRequest(url, setter, urlparams) {
  axios.delete(url, { params: urlparams }).then(res => {
    setter ? setter(res.data) : <></>; 
    console.log(res.data)
  });
}