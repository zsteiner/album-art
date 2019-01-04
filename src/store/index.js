import Vue from 'vue';
import Vuex from 'vuex';

import itunes from './modules/itunes';
import searchModule from './modules/searchModule';
import spotify from './modules/spotify';

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
  modules: {
    itunes,
    searchModule,
    spotify,
  },
});
