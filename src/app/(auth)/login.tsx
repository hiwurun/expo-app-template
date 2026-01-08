import { AuthScaffold } from '@/components/AuthScaffold';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/form-input';
import { Text } from '@/components/ui/text';
import useLogin, { type LoginType } from '@/hooks/auth/useLogin';
import { useSendCode } from '@/hooks/auth/useSendCode';
import { useOtpCountdown } from '@/hooks/useOtpCountdown';
import { cn } from '@/lib/utils';
import {
  loginCodeSchema,
  loginPasswordSchema,
  type LoginCodeInput,
  type LoginPasswordInput,
} from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { Eye, EyeClosed, Lock, Phone, ShieldCheck } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, ScrollView, View } from 'react-native';

const iconSize = 20;
const supportRowHeightClass = 'h-10';

function PasswordLoginForm({ onSwitchToCode }: { onSwitchToCode: () => void }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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
    <>
      <View className="gap-6">
        <View className="flex-row rounded-full border border-border bg-accent/20 p-1">
          <Pressable className="flex-1 items-center rounded-full bg-destructive px-4 py-2">
            <Text className="text-sm font-semibold text-destructive-foreground">
              密码登录
            </Text>
          </Pressable>
          <Pressable
            onPress={onSwitchToCode}
            className="flex-1 items-center rounded-full px-4 py-2"
          >
            <Text className="text-sm font-semibold text-muted-foreground">
              验证码登录
            </Text>
          </Pressable>
        </View>

        <FormInput
          control={control}
          name="phone"
          label="手机号"
          placeholder="请输入手机号"
          leftIcon={<Phone size={iconSize} />}
          keyboardType="phone-pad"
          containerClassName={cn(
            'bg-transparent border-0 border-b border-border rounded-none px-0 h-auto py-2',
            errors.phone && 'border-destructive',
          )}
          className="text-foreground"
          error={errors.phone?.message}
        />

        <FormInput
          control={control}
          name="password"
          label="密码"
          placeholder="请输入密码"
          secureTextEntry={!showPassword}
          leftIcon={<Lock size={iconSize} />}
          rightIcon={
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Eye size={iconSize} />
              ) : (
                <EyeClosed size={iconSize} />
              )}
            </Pressable>
          }
          containerClassName={cn(
            'bg-transparent border-0 border-b border-border rounded-none px-0 h-auto py-2',
            errors.password && 'border-destructive',
          )}
          className="text-foreground"
          error={errors.password?.message}
        />

        {/* <View
          className={cn(
            'flex-row items-center justify-end',
            supportRowHeightClass,
          )}
        >
          <Pressable>
            <Text className="text-xs font-semibold text-destructive">
              忘记密码？
            </Text>
          </Pressable>
        </View> */}
      </View>

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

      <View className="flex-row justify-center gap-1">
        <Text className="text-sm text-muted-foreground">还没有账号？</Text>
        <Pressable onPress={() => router.replace('/register')}>
          <Text className="text-sm font-medium text-destructive">立即注册</Text>
        </Pressable>
      </View>
    </>
  );
}

function CodeLoginForm({
  onSwitchToPassword,
}: {
  onSwitchToPassword: () => void;
}) {
  const router = useRouter();
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
    <>
      <View className="gap-6">
        <View className="flex-row rounded-full border border-border bg-accent/20 p-1">
          <Pressable
            onPress={onSwitchToPassword}
            className="flex-1 items-center rounded-full px-4 py-2"
          >
            <Text className="text-sm font-semibold text-muted-foreground">
              密码登录
            </Text>
          </Pressable>
          <Pressable className="flex-1 items-center rounded-full bg-destructive px-4 py-2">
            <Text className="text-sm font-semibold text-destructive-foreground">
              验证码登录
            </Text>
          </Pressable>
        </View>

        <FormInput
          control={control}
          name="phone"
          label="手机号"
          placeholder="请输入手机号"
          leftIcon={<Phone size={iconSize} />}
          keyboardType="phone-pad"
          containerClassName={cn(
            'bg-transparent border-0 border-b border-border rounded-none px-0 h-auto py-2',
            errors.phone && 'border-destructive',
          )}
          className="text-foreground"
          error={errors.phone?.message}
        />

        <FormInput
          control={control}
          name="code"
          label="验证码"
          placeholder="请输入验证码"
          leftIcon={<ShieldCheck size={iconSize} />}
          keyboardType="number-pad"
          rightIcon={
            <Pressable disabled={isSendDisabled} onPress={onSendCode}>
              <Text
                className={cn(
                  'text-xs font-semibold',
                  isSendDisabled ? 'text-muted-foreground' : 'text-destructive',
                )}
              >
                {sendButtonText}
              </Text>
            </Pressable>
          }
          containerClassName={cn(
            'bg-transparent border-0 border-b border-border rounded-none px-0 h-auto py-2',
            errors.code && 'border-destructive',
          )}
          className="text-foreground"
          error={errors.code?.message}
        />

        <View className={supportRowHeightClass} />
      </View>

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

      <View className="flex-row justify-center gap-1">
        <Text className="text-sm text-muted-foreground">还没有账号？</Text>
        <Pressable onPress={() => router.replace('/register')}>
          <Text className="text-sm font-medium text-destructive">立即注册</Text>
        </Pressable>
      </View>
    </>
  );
}

export default function Login() {
  const [loginType, setLoginType] = useState<LoginType>('password');

  return (
    <AuthScaffold bgTop={-250}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="flex-grow justify-end px-6 pb-12 pt-20"
      >
        <View className="w-full max-w-md gap-8">
          <View className="gap-2">
            <Text className="text-[38px] font-medium text-foreground">
              登录
            </Text>
            <View className="h-[3px] w-[74px] bg-destructive" />
          </View>

          {loginType === 'password' ? (
            <PasswordLoginForm onSwitchToCode={() => setLoginType('code')} />
          ) : (
            <CodeLoginForm
              onSwitchToPassword={() => setLoginType('password')}
            />
          )}
        </View>
      </ScrollView>
    </AuthScaffold>
  );
}
