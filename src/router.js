import { createWebHistory, createRouter } from "vue-router";
import MainPage from "@/views/MainPage.vue";

const routes = [
  {
    path: "/",
    name: "MainPage",
    component: MainPage,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;