import { createStore } from 'vuex';
import axios from 'axios';

import router from './router';

import checkExpiration from './utils/checkExpiration';
import encodeQuery from './utils/encodeQuery';
import decodeQuery from './utils/decodeQuery';

export default createStore({
  state: {
    albums: {},
    country: 'us',
    media: 'music',
    searchTerm: null,
    madeSearch: false,
    service: 'itunes',
    spotifyAuth: false,
    entity: 'album',
  },
  mutations: {
    formatAppleAlbums(state, data) {
      state.albums = data.map((album) => ({
        id: album.collectionId,
        artist: album.artistName,
        title: album.collectionName ? album.collectionName : album.trackName,
        releaseDate: album.releaseDate,
        cover: album.artworkUrl100,
        coverMedRes: album.artworkUrl100.replace('100x100b', '600x600b'),
        coverHighRes: album.artworkUrl100.replace('100x100b', '100000x100000-999b'),
      }));
    },
    formatSpotifyAlbums(state, data) {
      state.albums = data.map((album) => ({
        id: album.id,
        artist: album.artists[0].name,
        title: album.name,
        releaseDate: album.release_date,
        cover: album.images.length > 2 ? album.images[2].url : album.images[0].url,
        coverMedRes: album.images[1].url,
        coverHighRes: album.images[0].url,
      }));
    },
    search(state, query) {
      localStorage.setItem('searchTerm', query);
      state.searchTerm = query;
    },
    updateMedia(state, value) {
      state.media = value;
      switch (value) {
        case 'music':
          state.entity = 'album';
          break;
        case 'tvShow':
          state.entity = 'tvSeason';
          break;
        case 'all':
          state.entity = 'allTrack';
          break;
        default:
          state.entity = value;
      }
    },
    queryStringToState(state, { q, media }) {
      const query = decodeQuery(q);

      localStorage.setItem('searchTerm', query);

      state.searchTerm = query;
      state.media = media;
    },
    updateSearch(state) {
      state.madeSearch = false;
    },
    updateSpotifyAuth(state, code) {
      const updateDate = new Date();
      const regex = /access_token=(.*?)&/;
      const auth = code.match(regex)[1];
      state.spotifyAuth = auth;

      localStorage.setItem('spotifyAuth', auth);
      localStorage.setItem('updateDate', updateDate.toDateString());
    },
    useLocalAuth(state, { spotifyAuth, searchTerm }) {
      state.spotifyAuth = spotifyAuth;
      if (searchTerm) {
        state.searchTerm = searchTerm;
      }
    },
    updateService(state, service) {
      state.service = service;
    },
    clearAuth(state) {
      state.spotifyAuth = null;
    },
  },
  actions: {
    getAppleAlbums({ dispatch, commit, state }) {
      const { country, media, entity, searchTerm } = state;
      const encodedQuery = encodeQuery(searchTerm);
      const api = `https://itunes.apple.com/search?term=${encodedQuery}&country=${country}&media=${media}&entity=${entity}`;

      dispatch('updateRoutes');

      axios
        .get(api)
        .then((response) => {
          commit('formatAppleAlbums', response.data.results);
          commit('updateSearch');
        })
        .catch((event) => {
          console.error(event); //eslint-disable-line
        });
    },
    getSpotifyAlbums({ dispatch, commit, state }) {
      const { country, searchTerm, entity, spotifyAuth } = state;
      const encodedQuery = encodeQuery(searchTerm);
      const api = `https://api.spotify.com/v1/search?access_token=${spotifyAuth}&q=${encodedQuery}&market=${country}&type=${entity}&limit=20`;

      dispatch('updateRoutes');
      axios
        .get(api)
        .then((response) => {
          commit('formatSpotifyAlbums', response.data.albums.items);
          commit('updateSearch');
        })
        .catch((event) => {
          console.error(event); //eslint-disable-line
          if (event.response.status === 401) {
            commit('clearAuth');
          }
        });
    },
    getSpotifyAuth({ state }) {
      const clientID = process.env.VUE_APP_SPOTIFY_CLIENT_ID;
      const redirect = encodeURIComponent(process.env.VUE_APP_SPOTIFY_REDIRECT);

      const api = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirect}&response_type=token&state=123`;

      if (state.searchTerm) {
        localStorage.setItem('searchTerm', state.searchTerm);
      }
      // @ts-ignore
      window.location = api as string;
    },
    setSpotifyAuth({ commit }, code) {
      commit('updateSpotifyAuth', code);
    },
    setMedia({ dispatch, commit }, value) {
      commit('updateMedia', value);
      dispatch('getAppleAlbums');
    },
    updateRoutes({ state }) {
      const { searchTerm, media } = state;
      const query = encodeQuery(searchTerm);
      router.push({ query: { q: query, media } }).catch(() => { });
    },
    getQueryStrings({ commit }, { q, media }) {
      if (q && media) {
        commit('queryStringToState', {
          q,
          media,
        });
        commit('updateMedia', media || 'music');
      }
    },
    setService({ commit }, service) {
      commit('updateService', service);
    },
    checkLocalStorageAuth({ commit }) {
      const spotifyAuth = localStorage.getItem('spotifyAuth');
      const updateDate = localStorage.getItem('updateDate');
      const searchTerm = localStorage.getItem('searchTerm');

      if (spotifyAuth && checkExpiration(updateDate)) {
        commit('useLocalAuth', {
          spotifyAuth,
          searchTerm,
        });
      }
    },
  },
});
