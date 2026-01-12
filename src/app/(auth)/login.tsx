import { AuthScaffold } from '@/components/auth-scaffold';
import { BottomSheetFormInput } from '@/components/ui/bottom-sheet-form-input';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import useLogin from '@/hooks/auth/useLogin';
import { useSendCode } from '@/hooks/auth/useSendCode';
import { useOtpCountdown } from '@/hooks/useOtpCountdown';
import { cn } from '@/lib/utils';
import {
  loginCodeSchema,
  loginPasswordSchema,
  type LoginCodeInput,
  type LoginPasswordInput,
} from '@/schemas';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { Eye, EyeClosed, Lock, Phone, ShieldCheck } from 'lucide-react-native';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, View } from 'react-native';

const iconSize = 20;

function PasswordLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutation: passwordLogin } = useLogin('password');

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginPasswordInput>({
    resolver: zodResolver(loginPasswordSchema),
    defaultValues: {
      phone: '',
      password: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = handleSubmit(async (values) => {
    await passwordLogin.mutateAsync(values);
  });

  return (
    <View className="gap-6">
      <View className="gap-2">
        <Text className="text-2xl font-bold text-white">密码登录</Text>
        <View className="h-[3px] w-16 bg-destructive" />
      </View>

      <BottomSheetFormInput
        control={control}
        name="phone"
        label="手机号"
        placeholder="请输入手机号"
        leftIcon={<Phone size={iconSize} color="white" />}
        keyboardType="phone-pad"
        containerClassName={cn(
          'bg-transparent border-0 border-b border-white/20 rounded-none px-0 h-auto py-2',
          errors.phone && 'border-destructive',
        )}
        error={errors.phone?.message}
      />

      <BottomSheetFormInput
        control={control}
        name="password"
        label="密码"
        placeholder="请输入密码"
        secureTextEntry={!showPassword}
        leftIcon={<Lock size={iconSize} color="white" />}
        rightIcon={
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <Eye size={iconSize} color="white" />
            ) : (
              <EyeClosed size={iconSize} color="white" />
            )}
          </Pressable>
        }
        containerClassName={cn(
          'bg-transparent border-0 border-b border-white/20 rounded-none px-0 h-auto py-2',
          errors.password && 'border-destructive',
        )}
        error={errors.password?.message}
      />

      <Button
        onPress={onSubmit}
        variant="destructive"
        size="lg"
        disabled={isSubmitting || passwordLogin.isPending}
        className="mt-4 rounded-xl shadow-sm active:opacity-90"
      >
        <Text className="text-lg font-semibold text-destructive-foreground">
          登录
        </Text>
      </Button>
    </View>
  );
}

function CodeLoginForm() {
  const { mutation: codeLogin } = useLogin('code');
  const sendCode = useSendCode();

  // 验证码倒计时
  const { seconds, isRunning, start: startCountdown } = useOtpCountdown(60);

  // 发送成功后开始倒计时
  useEffect(() => {
    if (sendCode.isSuccess) {
      startCountdown();
    }
  }, [sendCode.isSuccess, startCountdown]);

  const {
    control,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<LoginCodeInput>({
    resolver: zodResolver(loginCodeSchema),
    defaultValues: {
      phone: '',
      code: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = handleSubmit(async (values) => {
    await codeLogin.mutateAsync(values);
  });

  const onSendCode = useCallback(async () => {
    const isPhoneValid = await trigger('phone');
    if (!isPhoneValid) return;

    const phone = getValues('phone');
    await sendCode.mutateAsync({ phone });
  }, [trigger, getValues, sendCode]);

  // 按钮是否禁用
  const isSendDisabled = sendCode.isPending || isRunning;

  // 按钮文字
  const sendButtonText = sendCode.isPending
    ? '发送中...'
    : isRunning
      ? `${seconds}s后重发`
      : '发送验证码';

  return (
    <View className="gap-6">
      <View className="gap-2">
        <Text className="text-2xl font-bold text-white">验证码登录</Text>
        <View className="h-[3px] w-28 bg-destructive" />
      </View>

      <BottomSheetFormInput
        control={control}
        name="phone"
        label="手机号"
        placeholder="请输入手机号"
        leftIcon={<Phone size={iconSize} color="#FFFFFF" />}
        keyboardType="phone-pad"
        containerClassName={cn(
          'bg-transparent border-0 border-b border-white/20 rounded-none px-0 h-auto py-2',
          errors.phone && 'border-destructive',
        )}
        className="text-white"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        error={errors.phone?.message}
      />

      <BottomSheetFormInput
        control={control}
        name="code"
        label="验证码"
        placeholder="请输入验证码"
        leftIcon={<ShieldCheck size={iconSize} color="#FFFFFF" />}
        keyboardType="number-pad"
        rightIcon={
          <Pressable disabled={isSendDisabled} onPress={onSendCode}>
            <Text
              className={cn(
                'text-xs font-semibold',
                isSendDisabled ? 'text-white/50' : 'text-destructive',
              )}
            >
              {sendButtonText}
            </Text>
          </Pressable>
        }
        containerClassName={cn(
          'bg-transparent border-0 border-b border-white/20 rounded-none px-0 h-auto py-2',
          errors.code && 'border-destructive',
        )}
        className="text-white"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        error={errors.code?.message}
      />

      <Button
        onPress={onSubmit}
        variant="destructive"
        size="lg"
        disabled={isSubmitting || codeLogin.isPending}
        className="mt-4 rounded-xl shadow-sm active:opacity-90"
      >
        <Text className="text-lg font-semibold text-destructive-foreground">
          登录
        </Text>
      </Button>
    </View>
  );
}

export default function Login() {
  const router = useRouter();
  const passwordSheetRef = useRef<BottomSheetModal>(null);
  const codeSheetRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['50%'], []);

  // 背景组件
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  // 打开密码登录
  const handleOpenPasswordLogin = useCallback(() => {
    passwordSheetRef.current?.present();
  }, []);

  // 打开验证码登录
  const handleOpenCodeLogin = useCallback(() => {
    codeSheetRef.current?.present();
  }, []);

  return (
    <AuthScaffold>
      <View className="flex-1 justify-end gap-4 px-10 pb-16">
        <View className="gap-2">
          <Text className="text-5xl font-bold text-background">
            Open <Text className="text-5xl font-bold text-[#9990FF]">Vlab</Text>
          </Text>
          <Text className="text-base text-white/80">
            我们为期权交易者提供高效的图表工具
          </Text>
        </View>

        <View className="flex-row gap-3 pt-20">
          <Button
            onPress={handleOpenPasswordLogin}
            variant="default"
            size="lg"
            className="flex-1 rounded-3xl bg-background"
          >
            <Text className="text-base font-semibold text-foreground">
              密码登录
            </Text>
          </Button>
          <Button
            onPress={handleOpenCodeLogin}
            variant="outline"
            size="lg"
            className="flex-1 rounded-3xl border-border bg-transparent"
          >
            <Text className="text-base font-semibold text-background">
              验证码登录
            </Text>
          </Button>
        </View>

        {/* <View className="flex-row justify-center gap-1 pt-6">
          <Text className="text-sm text-white/60">还没有账号？</Text>
          <Pressable onPress={() => router.replace('/register')}>
            <Text className="text-sm font-medium text-background">
              立即注册
            </Text>
          </Pressable>
        </View> */}
      </View>

      {/* 密码登录 Bottom Sheet */}
      <BottomSheetModal
        ref={passwordSheetRef}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enableDynamicSizing={false}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: 'rgba(0, 0, 0)' }}
      >
        <BottomSheetView className="flex-1 px-6 pb-8">
          <PasswordLoginForm />
        </BottomSheetView>
      </BottomSheetModal>

      {/* 验证码登录 Bottom Sheet */}
      <BottomSheetModal
        ref={codeSheetRef}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enableDynamicSizing={false}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: 'rgba(0, 0, 0)' }}
      >
        <BottomSheetView className="flex-1 px-6 pb-8">
          <CodeLoginForm />
        </BottomSheetView>
      </BottomSheetModal>
    </AuthScaffold>
  );
}
