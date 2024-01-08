import { createWebHistory, createRouter } from 'vue-router';
import HomePage from './views/HomePage.vue';
import ItunesPage from './views/ItunesPage.vue';
import CallBackPage from './views/CallBackPage.vue';
import SpotifyPage from './views/SpotifyPage.vue';

export default createRouter({
  history: createWebHistory(),
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
      component: CallBackPage,
    },
  ],
});
