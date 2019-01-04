import Vue from 'vue';
import Vuex from 'vuex';

import itunes from './modules/itunes';
import searchModule from './modules/searchModule';
import spotify from './modules/spotify';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    albums: {},
    service: 'itunes',
  },
  modules: {
    itunes,
    searchModule,
    spotify,
  },
});
