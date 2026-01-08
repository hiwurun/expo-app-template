/**
 * 认证模块 API 端点常量
 */
export const AUTH_API_ENDPOINTS = {
  SEND_CODE: '/internal-api/sms/send' /** 短信验证码 */,
  LOGIN_PASSWORD: '/internal-api/auth/login/password' /** 密码登录 */,
  LOGIN_CODE: '/internal-api/auth/login' /** 验证码登录 */,
  REGISTER: '/internal-api/auth/register' /** 注册 */,
  RESET_PASSWORD: '/internal-api/auth/reset-password' /** 重置密码 */,
} as const;

/**
 * 用户模块 API 端点常量
 */
export const USER_API_ENDPOINTS = {
  GET_POINTS: '/internal-api/points' /** 获取用户积分 */,
  GET_USER: '/internal-api/auth/user' /** 获取用户信息 */,
} as const;
