import LoginPage from "@/views/login/LoginPage.vue";
import LayoutContainer from "../views/layout/LayoutContainer.vue";
import CodePage from "../views/Children/CodePage.vue";
import Workbench from "../views/Children/Workbench.vue";
import Project from "../views/Children/Project.vue";
import AiPage from "../views/Children/AiPage.vue";
import ArtIfact from "../views/Children/ArtIfact.vue";
import InSight from "../views/Children/InSight.vue";
import KnowLedge from "../views/Children/KnowLedge.vue";
import AutoMation from "../views/Children/AutoMation.vue";

export default [
  {
    path: "/",
    component: LoginPage,
  },
  {
    path: "/layout",
    component: LayoutContainer,
    children: [
      {
        path: "/workbench",
        component: Workbench,
      },
      {
        path: "/project",
        component: Project,
      },
      {
        path: "/ai",
        component: AiPage,
      },
      {
        path: "/code",
        component: CodePage,
      },
      {
        path: "/artifact",
        component: ArtIfact,
      },
      {
        path: "/insight",
        component: InSight,
      },
      {
        path: "/knowledge",
        component: KnowLedge,
      },
      {
        path: "/automation",
        component: AutoMation,
      },
    ],
  },
];
