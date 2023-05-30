import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import DetailView from "../views/DetailView.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "hash", // 使用哈希模式，对应 createWebHashHistory()
  routes: [
    {
      path: "/",
      name: "homeView",
      component: HomeView,
    },
    {
      path: "/:citycode",
      name: "cityCode",
      component: DetailView,
      props: true,
    },
  ],
});

export default router;
