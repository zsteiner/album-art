export default function decodeQuery(query) {
  const decodedQuery = query.replace(/\++/g, ' ');
  return decodedQuery;
}
