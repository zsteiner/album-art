import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import router from './router';

import encodeQuery from './utils/encodeQuery';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    albums: {},
    country: 'us',
    media: 'music',
    searchTerm: null,
    entity: 'album',
  },
  getters: {
    formatAppleAlbums: state => state.albums,
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
    queryStringToState(state, { q, media }) {
      state.searchTerm = q;
      state.media = media;
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
        })
        .catch(event => {
          console.error(event); //eslint-disable-line
        });
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
      commit('queryStringToState', {
        q,
        media,
      });
      commit('updateMedia', media || 'music');
    },
  },
});
