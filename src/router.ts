import { createWebHistory, createRouter } from 'vue-router';
import ItunesPage from '@/views/ItunesPage.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'itunes',
      component: ItunesPage,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
});
