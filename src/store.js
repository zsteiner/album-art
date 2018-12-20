import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import router from './router';

import encodeQuery from './utils/encodeQuery';
import decodeQuery from './utils/decodeQuery';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    albums: {},
    country: 'us',
    media: 'music',
    searchTerm: null,
    madeSearch: false,
    spotifyAuth: false,
    entity: 'album',
  },
  mutations: {
    formatAppleAlbums(state, data) {
      state.albums = data.map(album => ({
        id: album.collectionId,
        artist: album.artistName,
        title: album.collectionName ? album.collectionName : album.trackName,
        releaseDate: album.releaseDate,
        cover: album.artworkUrl100,
        coverMedRes: album.artworkUrl100.replace('100x100b', '600x600b'),
        coverHighRes: album.artworkUrl100.replace('100x100b', '100000x100000-999b'),
      }));
    },
    search(state, query) {
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
    updateAuth(state, data) {
      if (data) {
        state.spotifyAuth = true;
      }
    },
    queryStringToState(state, { q, media }) {
      state.searchTerm = decodeQuery(q);
      state.media = media;
    },
    updateSearch(state) {
      state.madeSearch = true;
    },
  },
  actions: {
    getAppleAlbums({ dispatch, commit, state }) {
      const { country, media, entity } = state;
      const encodedQuery = encodeQuery(state.searchTerm);
      const api = `https://itunes.apple.com/search?term=${encodedQuery}&country=${country}&media=${media}&entity=${entity}`;

      dispatch('updateRoutes');

      axios
        .get(api)
        .then(response => {
          commit('formatAppleAlbums', response.data.results);
          commit('updateSearch');
        })
        .catch(event => {
          console.error(event); //eslint-disable-line
        });
    },
    getSpotifyAuth() {
      const clientID = process.env.VUE_APP_SPOTIFY_CLIENT_ID;
      const redirect = encodeURIComponent(process.env.VUE_APP_SPOTIFY_REDIRECT);

      const api = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirect}&response_type=token&state=123`;
      window.location = api;
      console.log('redirect', redirect); //eslint-disable-line
      console.log('api', api); //eslint-disable-line
    },
    setMedia({ dispatch, commit }, value) {
      commit('updateMedia', value);
      dispatch('getAppleAlbums');
    },
    updateRoutes({ state }) {
      const { searchTerm, media } = state;
      const query = encodeQuery(searchTerm);
      router.push({ query: { q: query, media } });
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
  },
});
