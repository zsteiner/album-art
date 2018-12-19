export default function decodeQuery(query) {
  const decodedQuery = query.replace('+', ' ');
  return decodedQuery;
}
