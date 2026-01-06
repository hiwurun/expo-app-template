import { AUTH_API_ENDPOINTS } from '@/constants/api-endpoints';
import { fetchPOST } from '@/lib/fetch-helper';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

const { LOGIN_PASSWORD, LOGIN_CODE } = AUTH_API_ENDPOINTS;

export type LoginType = 'password' | 'code';

export interface LoginParams {
  phone: string;
  password?: string;
  code?: string;
}

export default function useLogin(type: LoginType) {
  const router = useRouter();

  return useMutation({
    mutationFn: async (params: LoginParams) => {
      const payload = {
        phone: params.phone,
        ...(type === 'password' && { password: params.password }),
        ...(type === 'code' && { code: params.code }),
      };
      const path = type === 'password' ? LOGIN_PASSWORD : LOGIN_CODE;
      return fetchPOST(path, payload);
    },
    onSuccess: () => {
      router.replace('/');
    },
  });
}
