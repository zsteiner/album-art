import type { Context } from '@netlify/edge-functions';

export default async (request: Request, _context: Context) => {
  const url = new URL(request.url);
  const response = await fetch(
    `https://itunes.apple.com/search${url.search}`,
  );
  const data = await response.text();

  return new Response(data, {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const config = { path: '/api/search' };
