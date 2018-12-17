import Vue from "vue";
import Router from "vue-router";
import itunes from "./views/itunes.vue";
import spotify from "./views/spotify.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "itunes",
      component: itunes
    },
    {
      path: "/spotify",
      name: "spotify",
      component: spotify
    }
  ]
});
