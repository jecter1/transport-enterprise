import axios from "axios";

export default function deleteRequest(url, urlparams) {
  axios.delete(url, { params: urlparams });
}