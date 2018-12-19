export default function encodeQuery(query) {
  const encodedQuery = query.replace(/\s/g, '+');
  console.log('encodedQuery', encodedQuery); // eslint-disable-line
  return encodedQuery;
}
