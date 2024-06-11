import { createWebHistory, createRouter } from "vue-router";
import MainPage from "@/views/MainPage.vue";
import ThesisPage from "./views/ThesisPage.vue";
import LinksPage from "./views/LinksPage.vue";
import KPIPage from "./views/KPIPage.vue";

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
  },
  {
    path: "/links",
    name: "LinksPage",
    component: LinksPage,
  },
  {
    path: "/kpi",
    name: "KPIPage",
    component: KPIPage,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;