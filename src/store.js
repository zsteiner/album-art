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
    service: 'itunes',
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
    formatSpotifyAlbums(state, data) {
      state.albums = data.map(album => ({
        id: album.id,
        artist: album.artists[0].name,
        title: album.name,
        releaseDate: album.release_date,
        cover: album.images[2].url,
        coverMedRes: album.images[1].url,
        coverHighRes: album.images[0].url,
      }));
      console.log('ALBUMS', data, state.albums);
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
    updateSpotifyAuth(state, code) {
      const regex = /access_token=(.*?)&/;
      const auth = code.match(regex)[1];
      state.spotifyAuth = auth;
    },
    updateService(state, service) {
      state.service = service;
    },
  },
  actions: {
    getAppleAlbums({ dispatch, commit, state }) {
      const {
        country, media, entity, searchTerm,
      } = state;
      const encodedQuery = encodeQuery(searchTerm);
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
    getSpotifyAlbums({ dispatch, commit, state }) {
      const {
        country, searchTerm, entity, spotifyAuth,
      } = state;
      const encodedQuery = encodeQuery(searchTerm);
      const api = `https://api.spotify.com/v1/search?access_token=${spotifyAuth}&q=${encodedQuery}&market=${country}&type=${entity}&limit=20`;

      dispatch('updateRoutes');
      console.log('api', api); //eslint-disable-line
      axios
        .get(api)
        .then(response => {
          console.log(response); //eslint-disable-line
          commit('formatSpotifyAlbums', response.data.albums.items);
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
    setService({ commit }, service) {
      commit('updateService', service);
    },
  },
});
