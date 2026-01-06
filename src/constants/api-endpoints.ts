/**
 * 认证模块 API 端点常量
 */
export const AUTH_API_ENDPOINTS = {
  SEND_CODE: '/internal-api/auth/send-code' /** 短信验证码 */,
  LOGIN_PASSWORD: '/internal-api/auth/login/password' /** 密码登录 */,
  LOGIN_CODE: '/internal-api/auth/login/code' /** 验证码登录 */,
  REGISTER: '/internal-api/auth/register' /** 注册 */,
  RESET_PASSWORD: '/internal-api/auth/reset-password' /** 重置密码 */,
} as const;
