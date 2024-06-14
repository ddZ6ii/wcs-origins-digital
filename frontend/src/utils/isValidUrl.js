export default function isValidUrl(url) {
  if (typeof url !== "string") return false;
  if (url.length === 0) return false;
  if (url.includes("null")) return false;
  if (url.includes("undefined")) return false;
  return true;
}
