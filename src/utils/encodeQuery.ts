export default function encodeQuery(query: string) {
  const encodedQuery = query.replace(/\s/g, '+');
  return encodedQuery;
}
