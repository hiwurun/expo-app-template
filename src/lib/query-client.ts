import { QueryClient } from '@tanstack/react-query';
import { Platform } from 'react-native';
import { toast } from 'sonner-native';

/**
 * 全局错误处理器
 * 统一处理所有 mutation 错误，避免在每个 hook 中重复写 toast
 */
const handleMutationError = (error: unknown) => {
  const message =
    error instanceof Error ? error.message : '操作失败，请稍后重试';
  toast.error(message, {
    duration: 3000,
    position: Platform.OS === 'ios' ? 'top-center' : 'bottom-center',
  });

  // 开发环境打印详细错误
  if (__DEV__) {
    console.error('[Mutation Error]', error);
  }
};

/**
 * React Query 客户端配置
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // === 重试策略 ===
      retry: (failureCount, error) => {
        // 4xx 错误不重试（客户端错误）
        if (error instanceof Error && error.message.includes('401'))
          return false;
        if (error instanceof Error && error.message.includes('403'))
          return false;
        if (error instanceof Error && error.message.includes('404'))
          return false;

        // 其他错误最多重试 2 次
        return failureCount < 2;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),

      // === 缓存策略 ===
      staleTime: 1000 * 60 * 5, // 5 分钟内数据被认为是新鲜的
      gcTime: 1000 * 60 * 10, // 10 分钟后清除缓存（原 cacheTime）

      // === 重新获取策略 ===
      refetchOnWindowFocus: false, // 窗口聚焦时不自动重新获取（移动端不需要）
      refetchOnReconnect: true, // 网络重连时自动重新获取
      refetchOnMount: true, // 组件挂载时重新获取

      // === 网络模式 ===
      networkMode: 'online', // 仅在在线时执行请求
    },
    mutations: {
      // === 重试策略 ===
      retry: (failureCount, error) => {
        // mutation 一般不重试，除非是网络错误
        if (error instanceof Error && error.message.includes('网络错误')) {
          return failureCount < 1;
        }
        return false;
      },

      // === 全局错误处理 ===
      onError: handleMutationError,

      // === 网络模式 ===
      networkMode: 'online',
    },
  },
});

/**
 * 类型安全的错误处理工具
 */
export const isAuthError = (error: unknown): boolean => {
  if (!(error instanceof Error)) return false;
  return error.message.includes('401') || error.message.includes('未授权');
};

export const isNetworkError = (error: unknown): boolean => {
  if (!(error instanceof Error)) return false;
  return error.message.includes('网络错误') || error.message.includes('超时');
};
