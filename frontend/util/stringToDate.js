export default function stringToDate(string) {
  if (string == null) return null;
  return new Date(string.slice(0, 4) + " " + string.slice(4, 6) + " " + string.slice(-2));
}