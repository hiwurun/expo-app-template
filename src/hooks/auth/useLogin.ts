import { useCallback } from 'react';

export type LoginType = 'password' | 'code';

export default function useLogin(type: LoginType) {
  const login = useCallback(async () => {}, []);

  return { login };
}
