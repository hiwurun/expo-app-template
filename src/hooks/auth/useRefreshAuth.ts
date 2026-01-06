import { USER_API_ENDPOINTS } from '@/constants/api-endpoints';
import { AUTH_QUERY_KEYS } from '@/constants/queryKeys';
import { fetchGET } from '@/lib/fetch-helper';
import useAuthStore from '@/stores/useAuthStore';
import type { User } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const { GET_USER } = USER_API_ENDPOINTS;

export interface RefreshAuthResponse {
  permissionToken: string;
  user: User;
}

export default function useRefreshAuth() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const query = useQuery({
    queryKey: AUTH_QUERY_KEYS.REFRESH,
    queryFn: async () => {
      return await fetchGET<RefreshAuthResponse>(GET_USER, {
        include_permissions: 1,
      });
    },
  });

  // 刷新成功后更新 auth store
  useEffect(() => {
    if (query.isSuccess && query.data) {
      const { permissionToken, user } = query.data;
      if (permissionToken && user) {
        setAuth({ token: permissionToken, user });
      }
    }
  }, [query.isSuccess, query.data, setAuth]);

  return {
    isRefreshing: query.isFetching,
    isSuccess: query.isSuccess,
    error: query.error,
    refetch: query.refetch,
  };
}
