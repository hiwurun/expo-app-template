import { USER_API_ENDPOINTS } from '@/constants/api-endpoints';
import { AUTH_QUERY_KEYS } from '@/constants/queryKeys';
import { fetchGET } from '@/lib/fetch-helper';
import useAuthStore from '@/stores/useAuthStore';
import usePointsStore from '@/stores/usePointsStore';
import type { Points } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const { GET_POINTS } = USER_API_ENDPOINTS;

export default function usePoints() {
  const setPoints = usePointsStore((state) => state.setPoints);
  const token = useAuthStore((state) => state.token);

  const query = useQuery({
    queryKey: AUTH_QUERY_KEYS.POINTS,
    queryFn: async () => {
      return await fetchGET<Points>(GET_POINTS);
    },
    enabled: Boolean(token),
  });
  useEffect(() => {
    if (query.isSuccess && query.data) {
      setPoints(query.data);
    }
  }, [query.isSuccess, query.data, setPoints]);

  return {
    points: query.data,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}
