export default function encodeQuery(query: string) {
  return encodeURIComponent(query.trim());
}
