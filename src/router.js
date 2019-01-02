import Vue from 'vue';
import Router from 'vue-router';
import home from './views/home.vue';
import itunes from './views/itunes.vue';
import callback from './views/callback.vue';
import spotify from './views/spotify.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
    },
    {
      path: '/itunes',
      name: 'itunes',
      component: itunes,
    },
    {
      path: '/spotify',
      name: 'spotify',
      component: spotify,
    },
    {
      path: '/callback',
      name: 'spotifyCallback',
      component: callback,
    },
  ],
});
