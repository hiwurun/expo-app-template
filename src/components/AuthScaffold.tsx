import { ReactNode, useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const loginBg = require('../../assets/login-bg.png');

type AuthScaffoldProps = {
  children: ReactNode;
  bgHeight?: number;
  bgTop?: number;
};

export function AuthScaffold({
  children,
  bgHeight = 550,
  bgTop = 0,
}: AuthScaffoldProps) {
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
    <SafeAreaView className="flex-1 bg-[#FFFCFC]">
      <Animated.Image
        source={loginBg}
        resizeMode="cover"
        className="absolute left-0 right-0 w-full"
        style={[{ height: bgHeight, top: bgTop }, bgStyle]}
      />
      <View className="flex-1">{children}</View>
    </SafeAreaView>
  );
}
