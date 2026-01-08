import { AUTH_API_ENDPOINTS } from '@/constants/api-endpoints';
import { fetchPOST } from '@/lib/fetch-helper';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner-native';

const { SEND_CODE } = AUTH_API_ENDPOINTS;

interface SendCodeParams {
  phone: string;
}

export function useSendCode() {
  return useMutation({
    mutationFn: async ({ phone }: SendCodeParams) => {
      return fetchPOST(SEND_CODE, { phone, type: 'login', captchaCode: false });
    },
    onSuccess: () => {
      toast.success('验证码发送成功');
    },
  });
}
