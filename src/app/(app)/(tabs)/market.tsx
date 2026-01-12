import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import useAuthStore from '@/stores/useAuthStore';
import { VStack } from '@nkzw/stack';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CandlestickChart } from 'react-native-wagmi-charts';

export default function Market() {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.logout);
  const tabBarHeight = useBottomTabBarHeight();

  const candles = useMemo(
    () => [
      {
        timestamp: 1736686800000,
        open: 43210.23,
        high: 43520.48,
        low: 43120.18,
        close: 43412.9,
      },
      {
        timestamp: 1736688600000,
        open: 43412.9,
        high: 43650.73,
        low: 43220.28,
        close: 43550.33,
      },
      {
        timestamp: 1736690400000,
        open: 43550.33,
        high: 43710.65,
        low: 43430.11,
        close: 43680.51,
      },
      {
        timestamp: 1736692200000,
        open: 43680.51,
        high: 43800.13,
        low: 43510.3,
        close: 43532.11,
      },
      {
        timestamp: 1736694000000,
        open: 43532.11,
        high: 43740.68,
        low: 43400.22,
        close: 43610.44,
      },
      {
        timestamp: 1736695800000,
        open: 43610.44,
        high: 43780.76,
        low: 43580.15,
        close: 43710.33,
      },
      {
        timestamp: 1736697600000,
        open: 43710.33,
        high: 43890.18,
        low: 43620.11,
        close: 43840.17,
      },
      {
        timestamp: 1736699400000,
        open: 43840.17,
        high: 43920.71,
        low: 43710.02,
        close: 43750.44,
      },
      {
        timestamp: 1736701200000,
        open: 43750.44,
        high: 43800.35,
        low: 43580.22,
        close: 43632.12,
      },
      {
        timestamp: 1736703000000,
        open: 43632.12,
        high: 43790.11,
        low: 43550.07,
        close: 43750.22,
      },
      {
        timestamp: 1736704800000,
        open: 43750.22,
        high: 43880.34,
        low: 43700.11,
        close: 43810.9,
      },
      {
        timestamp: 1736706600000,
        open: 43810.9,
        high: 43940.6,
        low: 43780.14,
        close: 43910.25,
      },
    ],
    [],
  );

  const latest = candles[candles.length - 1];
  const previous = candles[candles.length - 2];
  const changePercent = useMemo(() => {
    if (!latest || !previous) return 0;
    return ((latest.close - previous.close) / previous.close) * 100;
  }, [latest, previous]);

  const logout = useCallback(() => {
    clearAuth();
    router.replace('/login');
  }, [clearAuth, router]);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <View style={{ flex: 1, paddingBottom: tabBarHeight }}>
        <VStack flex1 padding={16} gap={16}>
          <VStack gap={4}>
            <Text className="text-xl font-bold">行情</Text>
            <Text className="text-sm text-gray-500">
              示例数据，演示蜡烛图与游标交互
            </Text>
          </VStack>

          <CandlestickChart.Provider data={candles}>
            <VStack
              className="rounded-2xl bg-white/80 dark:bg-white/5"
              padding={16}
              gap={12}
            >
              <VStack gap={4}>
                <Text className="text-3xl font-extrabold">
                  ¥{latest?.close.toFixed(2) ?? '--'}
                </Text>
                <Text
                  className={`text-sm ${
                    changePercent >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {changePercent >= 0 ? '+' : ''}
                  {changePercent.toFixed(2)}%
                </Text>
              </VStack>

              <CandlestickChart height={280}>
                <CandlestickChart.Candles
                  positiveColor="#16a34a"
                  negativeColor="#ef4444"
                />
                <CandlestickChart.Crosshair color="#2563eb">
                  <CandlestickChart.Tooltip />
                </CandlestickChart.Crosshair>
              </CandlestickChart>

              <VStack className="flex-row items-center justify-between">
                <CandlestickChart.PriceText
                  variant="value"
                  style={{ fontSize: 18, fontWeight: '600', color: '#0f172a' }}
                  format={({ value, formatted }) => {
                    'worklet';
                    const numeric = Number(value);
                    if (Number.isFinite(numeric)) {
                      return `¥${numeric.toFixed(2)}`;
                    }
                    return formatted ?? '';
                  }}
                />
                <CandlestickChart.DatetimeText
                  style={{ fontSize: 14, color: '#64748b' }}
                  locale="zh-CN"
                  options={{
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  }}
                  format={({ value, formatted }) => {
                    'worklet';
                    return value ? formatted : '';
                  }}
                />
              </VStack>
            </VStack>
          </CandlestickChart.Provider>

          <VStack gap={8}>
            <Button onPress={logout} variant="destructive">
              <Text>退出登录</Text>
            </Button>
          </VStack>
        </VStack>
      </View>
    </SafeAreaView>
  );
}
