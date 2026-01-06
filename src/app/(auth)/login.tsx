import { AuthScaffold } from '@/components/AuthScaffold';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FormInput } from '@/components/ui/form-input';
import { Text } from '@/components/ui/text';
import useLogin, { type LoginType } from '@/hooks/auth/useLogin';
import { useSendCode } from '@/hooks/auth/useSendCode';
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
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, ScrollView, View } from 'react-native';

const iconSize = 20;

export default function Login() {
  const router = useRouter();
  const [loginType, setLoginType] = useState<LoginType>('password');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const passwordLogin = useLogin('password');
  const codeLogin = useLogin('code');
  const sendCode = useSendCode();

  const passwordForm = useForm<LoginPasswordInput>({
    resolver: zodResolver(loginPasswordSchema),
    defaultValues: {
      phone: '',
      password: '',
    },
    mode: 'onChange',
  });

  const codeForm = useForm<LoginCodeInput>({
    resolver: zodResolver(loginCodeSchema),
    defaultValues: {
      phone: '',
      code: '',
    },
    mode: 'onChange',
  });

  const onPasswordLogin = passwordForm.handleSubmit(async (values) => {
    await passwordLogin.mutateAsync(values);
  });

  const onCodeLogin = codeForm.handleSubmit(async (values) => {
    await codeLogin.mutateAsync(values);
  });

  const onSendCode = useCallback(async () => {
    const isPhoneValid = await codeForm.trigger('phone');
    if (!isPhoneValid) return;

    const phone = codeForm.getValues('phone');
    await sendCode.mutateAsync({ phone });
  }, [codeForm, sendCode]);

  const isSubmitting =
    loginType === 'password' ? passwordLogin.isPending : codeLogin.isPending;
  const isValid =
    loginType === 'password'
      ? passwordForm.formState.isValid
      : codeForm.formState.isValid;

  return (
    <AuthScaffold bgTop={-180}>
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

          <View className="gap-6">
            <View className="flex-row rounded-full border border-border bg-accent/20 p-1">
              {[
                { key: 'password', label: '密码登录' },
                { key: 'code', label: '验证码登录' },
              ].map(({ key, label }) => (
                <Pressable
                  key={key}
                  onPress={() => setLoginType(key as LoginType)}
                  className={cn(
                    'flex-1 items-center rounded-full px-4 py-2',
                    loginType === key && 'bg-destructive',
                  )}
                >
                  <Text
                    className={cn(
                      'text-sm font-semibold',
                      loginType === key
                        ? 'text-destructive-foreground'
                        : 'text-muted-foreground',
                    )}
                  >
                    {label}
                  </Text>
                </Pressable>
              ))}
            </View>

            {loginType === 'password' ? (
              <>
                <FormInput
                  control={passwordForm.control}
                  name="phone"
                  label="手机号"
                  placeholder="请输入手机号"
                  leftIcon={<Phone size={iconSize} />}
                  keyboardType="phone-pad"
                  containerClassName={cn(
                    'bg-transparent border-0 border-b border-border rounded-none px-0 h-auto py-2',
                    passwordForm.formState.errors.phone && 'border-destructive',
                  )}
                  className="text-foreground"
                  error={passwordForm.formState.errors.phone?.message}
                />

                <FormInput
                  control={passwordForm.control}
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
                    passwordForm.formState.errors.password &&
                      'border-destructive',
                  )}
                  className="text-foreground"
                  error={passwordForm.formState.errors.password?.message}
                />

                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-3">
                    <Checkbox
                      checked={rememberMe}
                      onCheckedChange={(value) => setRememberMe(!!value)}
                      className="border-muted-foreground"
                      checkedClassName="border-destructive"
                      indicatorClassName="bg-destructive"
                      iconClassName="text-destructive-foreground"
                    />
                    <Text className="text-xs font-medium text-foreground">
                      记住我
                    </Text>
                  </View>

                  <Pressable>
                    <Text className="text-xs font-semibold text-destructive">
                      忘记密码？
                    </Text>
                  </Pressable>
                </View>
              </>
            ) : (
              <>
                <FormInput
                  control={codeForm.control}
                  name="phone"
                  label="手机号"
                  placeholder="请输入手机号"
                  leftIcon={<Phone size={iconSize} />}
                  keyboardType="phone-pad"
                  containerClassName={cn(
                    'bg-transparent border-0 border-b border-border rounded-none px-0 h-auto py-2',
                    codeForm.formState.errors.phone && 'border-destructive',
                  )}
                  className="text-foreground"
                  error={codeForm.formState.errors.phone?.message}
                />

                <FormInput
                  control={codeForm.control}
                  name="code"
                  label="验证码"
                  placeholder="请输入验证码"
                  leftIcon={<ShieldCheck size={iconSize} />}
                  keyboardType="number-pad"
                  rightIcon={
                    <Pressable
                      disabled={sendCode.isPending}
                      onPress={onSendCode}
                    >
                      <Text
                        className={cn(
                          'text-xs font-semibold',
                          sendCode.isPending
                            ? 'text-muted-foreground'
                            : 'text-destructive',
                        )}
                      >
                        {sendCode.isPending ? '发送中...' : '发送验证码'}
                      </Text>
                    </Pressable>
                  }
                  containerClassName={cn(
                    'bg-transparent border-0 border-b border-border rounded-none px-0 h-auto py-2',
                    codeForm.formState.errors.code && 'border-destructive',
                  )}
                  className="text-foreground"
                  error={codeForm.formState.errors.code?.message}
                />
              </>
            )}
          </View>

          <Button
            onPress={loginType === 'password' ? onPasswordLogin : onCodeLogin}
            variant="destructive"
            size="lg"
            disabled={!isValid || isSubmitting}
            className="mt-4 rounded-xl shadow-sm active:opacity-90"
          >
            <Text className="text-lg font-semibold text-destructive-foreground">
              登录
            </Text>
          </Button>

          <View className="flex-row justify-center gap-1">
            <Text className="text-sm text-muted-foreground">还没有账号？</Text>
            <Pressable onPress={() => router.replace('/register')}>
              <Text className="text-sm font-medium text-destructive">
                立即注册
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </AuthScaffold>
  );
}
