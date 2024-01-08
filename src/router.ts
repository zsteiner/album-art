import { createWebHistory, createRouter } from 'vue-router';
import ItunesPage from '@/views/ItunesPage.vue';
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
      path: '/callback',
      name: 'spotifyCallback',
      component: CallBack,
    },
  ],
});
