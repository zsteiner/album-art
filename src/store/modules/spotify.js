import axios from 'axios';

import checkExpiration from '../../utils/checkExpiration';
import encodeQuery from '../../utils/encodeQuery';

// actions
const actions = {
  getSpotifyAlbums({ dispatch, commit, state }) {
    const {
      country, searchTerm, entity, spotifyAuth,
    } = state;
    const encodedQuery = encodeQuery(searchTerm);
    const api = `https://api.spotify.com/v1/search?access_token=${spotifyAuth}&q=${encodedQuery}&market=${country}&type=${entity}&limit=20`;

    dispatch('updateRoutes');
    axios
      .get(api)
      .then(response => {
        commit('formatSpotifyAlbums', response.data.albums.items);
        commit('updateSearch');
      })
      .catch(event => {
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

    window.location = api;
  },
  setSpotifyAuth({ commit }, code) {
    commit('updateSpotifyAuth', code);
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
};

// mutations
const mutations = {
  formatSpotifyAlbums(state, data) {
    state.albums = data.map(album => ({
      id: album.id,
      artist: album.artists[0].name,
      title: album.name,
      releaseDate: album.release_date,
      cover: album.images.length > 2 ? album.images[2].url : album.images[0].url,
      coverMedRes: album.images[1].url,
      coverHighRes: album.images[0].url,
    }));
  },
  updateSpotifyAuth(state, code) {
    const updateDate = new Date();
    const regex = /access_token=(.*?)&/;
    const auth = code.match(regex)[1];

    state.spotifyAuth = auth;

    localStorage.setItem('spotifyAuth', auth);
    localStorage.setItem('updateDate', updateDate);
  },
  useLocalAuth(state, { spotifyAuth, searchTerm }) {
    state.spotifyAuth = spotifyAuth;
    if (searchTerm) {
      state.searchTerm = searchTerm;
    }
  },
  clearAuth(state) {
    state.spotifyAuth = null;
  },
};

export default {
  actions,
  mutations,
};
