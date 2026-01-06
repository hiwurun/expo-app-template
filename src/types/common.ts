export interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
  success: boolean;
}

export interface User {
  id: number;
  nickname: string;
  phone: string;
  email?: string;
  avatar: string | null;
  auth_methods: {
    phone: boolean;
    password: boolean;
  };
  created_at: string;
  updated_at: string;
}
