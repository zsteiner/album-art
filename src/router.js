import Vue from 'vue';
import Router from 'vue-router';
import HomePage from './views/HomePage.vue';
import ItunesPage from './views/ItunesPage.vue';
import callback from './views/callback.vue';
import SpotifyPage from './views/SpotifyPage.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/itunes',
      name: 'itunes',
      component: ItunesPage,
    },
    {
      path: '/spotify',
      name: 'spotify',
      component: SpotifyPage,
    },
    {
      path: '/callback',
      name: 'spotifyCallback',
      component: callback,
    },
  ],
});
