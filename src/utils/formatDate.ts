export default function formatDate(releaseDate: string): string {
  return new Date(releaseDate).toLocaleDateString('en-us', { year: 'numeric' });
}
