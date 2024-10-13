import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import { ElMessage } from "element-plus";
const router = createRouter({
  history: createWebHistory(),
  routes,
});
// 前置路由守卫
router.beforeEach(async (to, from, next) => {
  const token = await localStorage.getItem("token");

  if (to.path !== "/") {
    if (token) {
      // 如果有 token，允许访问
      next();
    } else {
      // 如果没有 token，跳转到登录页面并提示需要登录
      ElMessage.error("请先登录");
      next("/");
    }
  } else {
    next();
  }
});
export default router;