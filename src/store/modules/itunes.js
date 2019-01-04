import axios from 'axios';

import encodeQuery from '../../utils/encodeQuery';

// actions
const actions = {
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
};

// mutations
const mutations = {
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
};

export default {
  actions,
  mutations,
};
