import router from '../../router';

import encodeQuery from '../../utils/encodeQuery';
import decodeQuery from '../../utils/decodeQuery';

// actions
const actions = {
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
};

// mutations
const mutations = {
  search(state, query) {
    localStorage.setItem('searchTerm', query);
    state.searchTerm = query;
    state.madeSearch = true;
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
  updateService(state, service) {
    state.service = service;
  },
};

export default {
  actions,
  mutations,
};
