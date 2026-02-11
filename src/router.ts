import { createWebHistory, createRouter } from 'vue-router';
import ItunesPage from '@/views/ItunesPage.vue';

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
  ],
});
