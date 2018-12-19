export default function encodeQuery(query) {
  const encodedQuery = query.replace(/\s/g, '+');
  return encodedQuery;
}
