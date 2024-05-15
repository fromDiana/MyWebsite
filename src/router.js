import { createWebHistory, createRouter } from "vue-router";
import MainPage from "@/views/MainPage.vue";
import ThesisPage from "./views/ThesisPage.vue";

const routes = [
  {
    path: "/",
    name: "MainPage",
    component: MainPage,
  },
  {
    path: "/thesis",
    name: "ThesisPage",
    component: ThesisPage,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;