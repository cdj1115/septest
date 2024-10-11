import request from "./request";
// 登录验证
export const getLogin = (data) => request.post("/oauth/token", data);

// 创建一个仓库
export const createRepo = (data) => request.post("/api/v5/user/repos", data);
// 刷新令牌
export const refreshToken = (data) =>
  request.post(
    "/oauth/token?grant_type=refresh_token&refresh_token={refresh_token}",
    data
  );

// 获取仓库
export const getRepo = () => request.get("/api/v5/users/{name}/repos");
