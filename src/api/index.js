import request from './request'
// 登录验证
export const getLogin = (data) => request.post("/oauth/token", data);