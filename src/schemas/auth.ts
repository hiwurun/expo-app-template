import { z } from 'zod';

// 手机号验证
const phoneRegex = /^1[3-9]\d{9}$/;

// 登录 Schema - 密码模式
export const loginPasswordSchema = z.object({
  phone: z
    .string()
    .min(1, '请输入手机号')
    .regex(phoneRegex, '请输入有效的手机号'),
  password: z.string().min(6, '密码至少6位'),
});

// 登录 Schema - 验证码模式
export const loginCodeSchema = z.object({
  phone: z
    .string()
    .min(1, '请输入手机号')
    .regex(phoneRegex, '请输入有效的手机号'),
  code: z
    .string()
    .length(6, '验证码为6位数字')
    .regex(/^\d{6}$/, '验证码只能包含数字'),
});

// 注册 Schema
export const signupSchema = z
  .object({
    phone: z
      .string()
      .min(1, '请输入手机号')
      .regex(phoneRegex, '请输入有效的手机号'),
    code: z
      .string()
      .length(6, '验证码为6位数字')
      .regex(/^\d{6}$/, '验证码只能包含数字'),
    password: z
      .string()
      .min(8, '密码至少8位')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, '密码需包含大小写字母和数字'),
    confirmPassword: z.string().min(1, '请确认密码'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '两次密码输入不一致',
    path: ['confirmPassword'],
  });

// 导出类型
export type LoginPasswordInput = z.infer<typeof loginPasswordSchema>;
export type LoginCodeInput = z.infer<typeof loginCodeSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
