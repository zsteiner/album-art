/* eslint no-shadow: 0 */

import axios from 'axios';

import encodeQuery from '../../utils/encodeQuery';

const state = {
  country: 'us',
  media: 'music',
  entity: 'album',
};

// actions
const actions = {
  getAppleAlbums({
    dispatch, commit, state, rootState,
  }) {
    const { country, media, entity } = state;

    const { searchTerm } = rootState;
    console.log('searchTerm', searchTerm);

    const encodedQuery = encodeQuery(searchTerm);
    const api = `https://itunes.apple.com/search?term=${encodedQuery}&country=${country}&media=${media}&entity=${entity}`;

    dispatch('updateRoutes', { root: true });

    axios
      .get(api)
      .then(response => {
        commit('formatAppleAlbums', response.data.results, { root: true });
        commit('updateSearch', null, { root: true });
      })
      .catch(event => {
        console.error(event); //eslint-disable-line
      });
  },
};

// mutations
const mutations = {
  formatAppleAlbums({ rootState }, data) {
    rootState.albums = data.map(album => ({
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
  root: true,
  state,
  actions,
  mutations,
};
