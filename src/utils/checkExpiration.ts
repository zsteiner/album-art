export default function checkExpiration(updateDate: string | null): boolean {
  if (!updateDate) return false;

  const now = Date.now();
  const then = new Date(updateDate).getTime();
  const diffInSeconds = (now - then) / 1000;

  return diffInSeconds < 3600;
}
