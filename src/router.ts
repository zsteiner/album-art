import { createWebHistory, createRouter } from 'vue-router';
import ItunesPage from '@/views/ItunesPage.vue';
import SpotifyPage from '@/views/SpotifyPage.vue';
import CallBack from '@/views/CallBack.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: { name: 'itunes' },
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
      component: CallBack,
    },
  ],
});
