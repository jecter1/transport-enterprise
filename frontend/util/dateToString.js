export default function formatDate(date) {
  if (date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    if (isNaN(year)) {
      return;
    }

    let res = "" + year;
    if (month < 9) {
      res = res + "0";
    }
    res = res + (month + 1);
    if (day < 10) {
      res = res + "0";
    }
    res = res + day;

    return res;
  }
}