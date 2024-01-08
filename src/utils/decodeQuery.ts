export default function decodeQuery(query: string) {
  const decodedQuery = query.replace(/\++/g, ' ');
  return decodedQuery;
}
