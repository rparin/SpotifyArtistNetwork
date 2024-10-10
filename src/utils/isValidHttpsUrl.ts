export default function isValidHttpsUrl(urlString: string) {
  let url;
  try {
    url = new URL(urlString);
  } catch (e) {
    return false;
  }
  return url.protocol === "https:";
}
