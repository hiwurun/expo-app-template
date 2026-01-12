import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const loginBg = require('../../assets/login/bg.png');

type AuthScaffoldProps = {
  children: ReactNode;
  bgHeight?: number;
  bgTop?: number;
};

export function AuthScaffold({ children }: AuthScaffoldProps) {
  const bgOffset = useSharedValue(-80);
  const bgOpacity = useSharedValue(0);

  useEffect(() => {
    bgOpacity.value = withTiming(1, {
      duration: 500,
      easing: Easing.out(Easing.ease),
    });
    bgOffset.value = withTiming(0, {
      duration: 500,
      easing: Easing.out(Easing.ease),
    });
  }, []);

  const bgStyle = useAnimatedStyle(() => {
    return {
      opacity: bgOpacity.value,
      transform: [{ translateY: bgOffset.value }],
    };
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaView className="flex-1 bg-black">
          {/* 背景图片 - 全屏 */}
          <Animated.Image
            source={loginBg}
            resizeMode="cover"
            className="absolute inset-0 h-full w-full"
            style={bgStyle}
          />
          {/* 渐变遮罩 - 从透明到黑色 */}
          <LinearGradient
            colors={[
              'transparent',
              'rgba(0,0,0,0.2)',
              'rgba(0,0,0,0.5)',
              'rgba(0,0,0,0.8)',
              '#000000',
            ]}
            locations={[0, 0.2, 0.5, 0.8, 1]}
            style={StyleSheet.absoluteFill}
          />
          <View className="flex-1">{children}</View>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
