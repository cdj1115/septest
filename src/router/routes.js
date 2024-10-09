import LoginPage from "@/views/login/LoginPage.vue";
import LayoutContainer from "../views/layout/LayoutContainer.vue";

export default [
  {
    path: "/",
    component: LoginPage,
  },
  {
    path: "/layout",
    component: LayoutContainer,
  },
];
