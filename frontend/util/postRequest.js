import axios from "axios";

export default function deleteRequest(url, body, setter) {
  axios.post(url, body).then(res => {
    setter ? setter(res.data) : <></>;
    console.log(res.data)
  });
}