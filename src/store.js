import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    albums: {},
    searchTerm: null,
    country: "us",
    media: "music"
  },
  getters: {
    getAppleAlbums: state => {
      return state.albums;
    }
  },
  mutations: {
    getAppleAlbums(state, data) {
      state.albums = data.map(album => ({
        id: album.collectionId,
        artist: album.artistName,
        title: album.collectionName,
        cover: album.artworkUrl100,
        coverMedRes: album.artworkUrl100.replace("100x100b", "600x600b"),
        coverHighRes: album.artworkUrl100.replace(
          "100x100b",
          "100000x100000-999b"
        )
      }));
    },
    search(state, query) {
      state.searchTerm = query;
    }
  },
  actions: {
    getAppleAlbums({ commit, state }, { type }) {
      const encodedQuery = encodeURI(state.searchTerm);
      const api = `https://itunes.apple.com/search?term=${encodedQuery}&country=${
        state.country
      }&media=${state.media}&entity=${type}`;
      axios
        .get(api)
        .then(response => {
          commit("getAppleAlbums", response.data.results);
        })
        .catch(event => {
          console.error(event); //eslint-disable-line
        });
    }
  }
});
