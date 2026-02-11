import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

import encodeQuery from '@/utils/encodeQuery';
import decodeQuery from '@/utils/decodeQuery';

import type { Album, AppleAlbum, MediaType, EntityType } from '@/types/album';

const MEDIA_TYPES: MediaType[] = ['music', 'movie', 'podcast', 'tvShow', 'ebook', 'all'];
const FETCH_TIMEOUT = 15_000;

function isValidMediaType(value: string): value is MediaType {
  return MEDIA_TYPES.includes(value as MediaType);
}

export const useAlbumStore = defineStore('album', () => {
  const router = useRouter();

  const albums = ref<Album[]>([]);
  const country = ref('us');
  const media = ref<MediaType>('music');
  const searchTerm = ref<string | null>(null);
  const madeSearch = ref(false);
  const error = ref<string | null>(null);
  const loading = ref(false);
  const entity = ref<EntityType>('album');

  let abortController: AbortController | null = null;

  function formatAlbums(data: AppleAlbum[]) {
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

  function updateRoutes() {
    const query = encodeQuery(searchTerm.value ?? '');
    router.push({ query: { q: query, media: media.value } }).catch((err) => {
      if (err.name !== 'NavigationDuplicated') {
        console.warn('Navigation failed:', err);
      }
    });
  }

  function cancelPendingRequest() {
    if (abortController) {
      abortController.abort();
      abortController = null;
    }
  }

  async function getAlbums() {
    const encodedQuery = encodeQuery(searchTerm.value ?? '');
    const api = `https://itunes.apple.com/search?term=${encodedQuery}&country=${country.value}&media=${media.value}&entity=${entity.value}`;

    updateRoutes();
    cancelPendingRequest();
    abortController = new AbortController();
    error.value = null;
    loading.value = true;

    try {
      const response = await fetch(api, {
        signal: AbortSignal.any([abortController.signal, AbortSignal.timeout(FETCH_TIMEOUT)]),
      });
      const data = await response.json();
      const results = data?.results;
      if (Array.isArray(results)) {
        formatAlbums(results);
      } else {
        albums.value = [];
      }
      madeSearch.value = true;
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        return;
      }
      console.error(err);
      error.value = 'Search failed. Please try again.';
      madeSearch.value = true;
    } finally {
      loading.value = false;
    }
  }

  function setMedia(value: MediaType) {
    updateMedia(value);
    getAlbums();
  }

  function getQueryStrings(q: string | undefined, mediaParam: string | undefined) {
    if (q && mediaParam) {
      const query = decodeQuery(q);
      setSearchTerm(query);
      if (isValidMediaType(mediaParam)) {
        updateMedia(mediaParam);
      } else {
        updateMedia('music');
      }
    }
  }

  return {
    albums,
    country,
    media,
    searchTerm,
    madeSearch,
    error,
    loading,
    entity,
    setSearchTerm,
    updateMedia,
    updateRoutes,
    getAlbums,
    setMedia,
    getQueryStrings,
  };
});
