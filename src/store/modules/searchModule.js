import router from '../../router';

import encodeQuery from '../../utils/encodeQuery';
import decodeQuery from '../../utils/decodeQuery';

// actions
const actions = {
  setMedia({ dispatch, commit }, value) {
    commit('updateMedia', value, { root: true });
    dispatch('getAppleAlbums', { root: true });
  },

  updateRoutes({ state }) {
    const { searchTerm, media } = state;
    const query = encodeQuery(searchTerm);
    router.push({ query: { q: query, media } });
  },

  getQueryStrings({ commit }, { q, media }) {
    if (q && media) {
      commit(
        'queryStringToState',
        {
          q,
          media,
        },
        { root: true },
      );
      commit('updateMedia', media || 'music', { root: true });
    }
  },

  setService({ commit }, service) {
    commit('updateService', service, { root: true });
  },
};

// mutations
const mutations = {
  search(state, rootState, query) {
    localStorage.setItem('searchTerm', query);
    console.log('rootState', rootState);
    rootState.searchTerm = query;
    state.madeSearch = true;
  },
  updateMedia(rootState, value) {
    rootState.media = value;
    switch (value) {
      case 'music':
        rootState.entity = 'album';
        break;
      case 'tvShow':
        rootState.entity = 'tvSeason';
        break;
      case 'all':
        rootState.entity = 'allTrack';
        break;
      default:
        rootState.entity = value;
    }
  },
  queryStringToState(rootState, { q, media }) {
    const query = decodeQuery(q);

    localStorage.setItem('searchTerm', query);

    rootState.searchTerm = query;
    rootState.media = media;
  },
  updateSearch(state, rootState) {
    state.madeSearch = false;
    rootState.madeSearch = false;
  },
  updateService(state, rootState, service) {
    state.service = service;
    rootState.service = service;
  },
};

export default {
  root: true,
  actions,
  mutations,
};
