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

export interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

export interface SpotifyArtist {
  name: string;
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  release_date: string;
  artists: SpotifyArtist[];
  images: SpotifyImage[];
}

export type MediaType = 'music' | 'movie' | 'podcast' | 'tvShow' | 'ebook' | 'all';
export type EntityType = 'album' | 'tvSeason' | 'allTrack' | 'movie' | 'podcast' | 'ebook';
export type ServiceType = 'itunes' | 'spotify';
