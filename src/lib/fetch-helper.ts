import useAuthStore from '@/stores/useAuthStore';
import usePointsStore from '@/stores/usePointsStore';
import type { ApiResponse } from '@/types';
import { router } from 'expo-router';

/**
 * 获取 API 基础 URL
 */
const getBaseURL = (): string => {
  return process.env.EXPO_PUBLIC_API_BASE_URL || '';
};

/**
 * 处理 401 未授权错误
 * 清除认证状态并跳转到登录页面
 */
const handleUnauthorized = () => {
  useAuthStore.getState().logout();
  usePointsStore.getState().clearPoints();
  router.replace('/login');
};

/**
 * 统一的 fetch 封装
 *
 * @param url - API 路径
 * @param options - fetch 选项
 * @returns Promise<T>
 */
export async function fetchJSON<T = any>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  try {
    // 构建完整 URL
    const fullURL = `${getBaseURL()}${url}`;

    // 获取 token
    const token = useAuthStore.getState().token;

    // 发起请求
    const response = await fetch(fullURL, {
      ...options,
      headers: {
        'Content-Type': 'application/json',

        ...options?.headers,
      },
    });

    // 处理 401 未授权
    if (response.status === 401) {
      handleUnauthorized();
      throw new Error('登录已过期，请重新登录');
    }

    // 解析响应
    const data: ApiResponse<T> = await response.json();

    // HTTP 错误处理
    if (!response.ok) {
      throw new Error(data.message || `HTTP ${response.status}`);
    }

    // 业务错误处理
    if (!data.success) {
      throw new Error(data.message || '请求失败');
    }

    // 返回数据
    return data.data;
  } catch (error) {
    // 网络错误
    if (
      error instanceof TypeError &&
      error.message === 'Network request failed'
    ) {
      throw new Error('网络错误，请检查网络连接');
    }

    // 超时错误
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('请求超时，请稍后重试');
    }

    // 其他错误
    throw error;
  }
}

/**
 * GET 请求
 */
export async function fetchGET<T = any>(
  url: string,
  params?: Record<string, string | number | boolean>,
): Promise<T> {
  // 构建查询参数
  let fullURL = url;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });
    fullURL = `${url}?${searchParams.toString()}`;
  }

  return fetchJSON<T>(fullURL, {
    method: 'GET',
  });
}

/**
 * POST 请求
 */
export async function fetchPOST<T = any>(url: string, body?: any): Promise<T> {
  return fetchJSON<T>(url, {
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined,
  });
}

/**
 * PUT 请求
 */
export async function fetchPUT<T = any>(url: string, body?: any): Promise<T> {
  return fetchJSON<T>(url, {
    method: 'PUT',
    body: body ? JSON.stringify(body) : undefined,
  });
}

/**
 * DELETE 请求
 */
export async function fetchDELETE<T = any>(url: string): Promise<T> {
  return fetchJSON<T>(url, {
    method: 'DELETE',
  });
}
