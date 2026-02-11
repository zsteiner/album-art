import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { useRouter } from 'vue-router';

import checkExpiration from '@/utils/checkExpiration';
import encodeQuery from '@/utils/encodeQuery';
import decodeQuery from '@/utils/decodeQuery';

import type {
  Album,
  AppleAlbum,
  SpotifyAlbum,
  MediaType,
  EntityType,
  ServiceType,
} from '@/types/album';

export const useAlbumStore = defineStore('album', () => {
  const router = useRouter();

  const albums = ref<Album[]>([]);
  const country = ref('us');
  const media = ref<MediaType>('music');
  const searchTerm = ref<string | null>(null);
  const madeSearch = ref(false);
  const service = ref<ServiceType>('itunes');
  const spotifyAuth = ref<string | null>(null);
  const entity = ref<EntityType>('album');

  function formatAppleAlbums(data: AppleAlbum[]) {
    albums.value = data.map((album) => ({
      id: album.collectionId,
      artist: album.artistName,
      title: album.collectionName ?? album.trackName ?? '',
      releaseDate: album.releaseDate,
      cover: album.artworkUrl100,
      coverMedRes: album.artworkUrl100.replace('100x100b', '600x600b'),
      coverHighRes: album.artworkUrl100.replace('100x100b', '100000x100000-999b'),
    }));
  }

  function formatSpotifyAlbums(data: SpotifyAlbum[]) {
    albums.value = data.map((album) => ({
      id: album.id,
      artist: album.artists[0].name,
      title: album.name,
      releaseDate: album.release_date,
      cover: album.images.length > 2 ? album.images[2].url : album.images[0].url,
      coverMedRes: album.images[1].url,
      coverHighRes: album.images[0].url,
    }));
  }

  function setSearchTerm(query: string) {
    localStorage.setItem('searchTerm', query);
    searchTerm.value = query;
  }

  function updateMedia(value: MediaType) {
    media.value = value;
    switch (value) {
      case 'music':
        entity.value = 'album';
        break;
      case 'tvShow':
        entity.value = 'tvSeason';
        break;
      case 'all':
        entity.value = 'allTrack';
        break;
      default:
        entity.value = value as EntityType;
    }
  }

  function queryStringToState(q: string, mediaParam: MediaType) {
    const query = decodeQuery(q);
    localStorage.setItem('searchTerm', query);
    searchTerm.value = query;
    media.value = mediaParam;
  }

  function clearAuth() {
    spotifyAuth.value = null;
  }

  function updateRoutes() {
    const query = encodeQuery(searchTerm.value ?? '');
    router.push({ query: { q: query, media: media.value } }).catch(() => {});
  }

  async function getAppleAlbums() {
    const encodedQuery = encodeQuery(searchTerm.value ?? '');
    const api = `https://itunes.apple.com/search?term=${encodedQuery}&country=${country.value}&media=${media.value}&entity=${entity.value}`;

    updateRoutes();

    try {
      const response = await axios.get(api);
      formatAppleAlbums(response.data.results);
      madeSearch.value = false;
    } catch (error) {
      console.error(error);
    }
  }

  async function getSpotifyAlbums() {
    const encodedQuery = encodeQuery(searchTerm.value ?? '');
    const api = `https://api.spotify.com/v1/search?access_token=${spotifyAuth.value}&q=${encodedQuery}&market=${country.value}&type=${entity.value}&limit=20`;

    updateRoutes();

    try {
      const response = await axios.get(api);
      formatSpotifyAlbums(response.data.albums.items);
      madeSearch.value = false;
    } catch (error: unknown) {
      console.error(error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        clearAuth();
      }
    }
  }

  function getSpotifyAuth() {
    const clientID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const redirect = encodeURIComponent(import.meta.env.VITE_SPOTIFY_REDIRECT);
    const api = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirect}&response_type=token&state=123`;

    if (searchTerm.value) {
      localStorage.setItem('searchTerm', searchTerm.value);
    }

    window.location.href = api;
  }

  function setSpotifyAuth(code: string) {
    const updateDate = new Date();
    const regex = /access_token=(.*?)&/;
    const match = code.match(regex);

    if (match) {
      const auth = match[1];
      spotifyAuth.value = auth;
      localStorage.setItem('spotifyAuth', auth);
      localStorage.setItem('updateDate', updateDate.toDateString());
    }
  }

  function setMedia(value: MediaType) {
    updateMedia(value);
    getAppleAlbums();
  }

  function getQueryStrings(q: string | undefined, mediaParam: string | undefined) {
    if (q && mediaParam) {
      queryStringToState(q, mediaParam as MediaType);
      updateMedia((mediaParam as MediaType) || 'music');
    }
  }

  function setService(svc: ServiceType) {
    service.value = svc;
  }

  function checkLocalStorageAuth() {
    const storedAuth = localStorage.getItem('spotifyAuth');
    const updateDate = localStorage.getItem('updateDate');
    const storedSearchTerm = localStorage.getItem('searchTerm');

    if (storedAuth && checkExpiration(updateDate)) {
      spotifyAuth.value = storedAuth;
      if (storedSearchTerm) {
        searchTerm.value = storedSearchTerm;
      }
    }
  }

  return {
    albums,
    country,
    media,
    searchTerm,
    madeSearch,
    service,
    spotifyAuth,
    entity,
    setSearchTerm,
    updateMedia,
    clearAuth,
    updateRoutes,
    getAppleAlbums,
    getSpotifyAlbums,
    getSpotifyAuth,
    setSpotifyAuth,
    setMedia,
    getQueryStrings,
    setService,
    checkLocalStorageAuth,
  };
});
