import {
  AUTH_API_ENDPOINTS,
  USER_API_ENDPOINTS,
} from '@/constants/api-endpoints';
import { fetchGET, fetchPOST } from '@/lib/fetch-helper';
import useAuthStore from '@/stores/useAuthStore';
import usePointsStore from '@/stores/usePointsStore';
import type { Points, User } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';

const { LOGIN_PASSWORD, LOGIN_CODE } = AUTH_API_ENDPOINTS;
const { GET_POINTS } = USER_API_ENDPOINTS;

export type LoginType = 'password' | 'code';

export interface LoginParams {
  phone: string;
  password?: string;
  code?: string;
}

export interface LoginResponse {
  permissionToken: string;
  user: User;
}
export default function useLogin(type: LoginType) {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const setPoints = usePointsStore((state) => state.setPoints);

  const mutation = useMutation({
    mutationFn: async (params: LoginParams) => {
      const payload = {
        phone: params.phone,
        captchaCode: false,
        ...(type === 'password' && { password: params.password }),
        ...(type === 'code' && { code: params.code }),
      };
      const path = type === 'password' ? LOGIN_PASSWORD : LOGIN_CODE;
      return await fetchPOST<LoginResponse>(path, payload);
    },
    onSuccess: async ({ permissionToken, user }) => {
      if (permissionToken && Object.keys(user).length > 0) {
        setAuth({ token: permissionToken, user });
        const points = await fetchGET<Points>(GET_POINTS);
        setPoints(points);

        router.replace('/');
      }
    },
  });

  return {
    mutation,
  };
}
