export interface Album {
  id: string | number;
  artist: string;
  title: string;
  releaseDate: string;
  cover: string;
  coverMedRes: string;
  coverHighRes: string;
}

export interface AppleAlbum {
  collectionId: number;
  artistName: string;
  collectionName?: string;
  trackName?: string;
  releaseDate: string;
  artworkUrl100: string;
}

export type MediaType = 'music' | 'movie' | 'podcast' | 'tvShow' | 'ebook' | 'all';
export type EntityType = 'album' | 'tvSeason' | 'allTrack' | 'movie' | 'podcast' | 'ebook';
