import { createWebHistory, createRouter } from 'vue-router';

import HomePage from './views/HomePage.vue';
import ItunesPage from './views/ItunesPage.vue';
import CallbackPage from './views/CallbackPage.vue';
import SpotifyPage from './views/SpotifyPage.vue';

const routes = [
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
    component: CallbackPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
