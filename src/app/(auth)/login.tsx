import { AuthScaffold } from '@/components/AuthScaffold';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import useViewerContext from '@/user/useViewerContext';
import { useRouter } from 'expo-router';
import { Check, Eye, EyeClosed, Lock, Mail } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

export default function Login() {
  const router = useRouter();
  const { login } = useViewerContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const onLogin = useCallback(async () => {
    // Add actual login logic here
    await login();
    router.replace('/');
  }, [login, router]);

  return (
    <AuthScaffold bgTop={-120}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="flex-grow justify-end px-6 pb-12 pt-20"
      >
        <View className="w-full max-w-md gap-8">
          <View className="gap-2">
            <Text className="text-[38px] font-medium text-[#424242]">
              Sign in
            </Text>
            <View className="h-[3px] w-[74px] bg-[#FF8383]" />
          </View>

          {/* Form */}
          <View className="gap-6">
            {/* Email */}
            <View className="gap-2">
              <Text className="text-base font-medium text-[#616161]">
                Email
              </Text>
              <Input
                placeholder="demo@email.com"
                value={email}
                onChangeText={setEmail}
                leftIcon={<Mail size={24} color="#BDBDBD" />}
                keyboardType="email-address"
                autoCapitalize="none"
                containerClassName="bg-transparent border-0 border-b border-[#616161] rounded-none px-0 h-auto py-2"
                className="text-[#616161]"
              />
            </View>

            {/* Password */}
            <View className="gap-2">
              <Text className="text-base font-medium text-[#616161]">
                Password
              </Text>
              <Input
                placeholder="enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                leftIcon={<Lock size={24} color="#BDBDBD" />}
                rightIcon={
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <Eye size={24} color="#BDBDBD" />
                    ) : (
                      <EyeClosed size={24} color="#BDBDBD" />
                    )}
                  </Pressable>
                }
                containerClassName="bg-transparent border-0 border-b border-[#BDBDBD] rounded-none px-0 h-auto py-2"
                className="text-[#616161]"
              />
            </View>

            {/* Remember Me & Forgot Password */}
            <View className="flex-row items-center justify-between">
              <Pressable
                className="flex-row items-center gap-2"
                onPress={() => setRememberMe(!rememberMe)}
              >
                <View
                  className={`h-4 w-4 items-center justify-center rounded border ${rememberMe ? 'border-[#FF8383] bg-[#FF8383]' : 'border-[#FF8383]'}`}
                >
                  {rememberMe && (
                    <Check size={10} color="white" strokeWidth={4} />
                  )}
                </View>
                <Text className="text-xs font-medium text-[#424242]">
                  Remember Me
                </Text>
              </Pressable>

              <Pressable>
                <Text className="text-xs font-semibold text-[#FF8383]">
                  Forgot Password?
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Login Button */}
          <Pressable
            onPress={onLogin}
            className="mt-4 items-center justify-center rounded-xl bg-[#FF8383] py-3.5 shadow-sm active:opacity-90"
          >
            <Text className="text-lg font-semibold text-[#F8F8FF]">Login</Text>
          </Pressable>

          {/* Footer */}
          <View className="flex-row justify-center gap-1">
            <Text className="text-sm text-[#9E9E9E]">
              Don't have an Account ?
            </Text>
            <Pressable onPress={() => router.replace('/register')}>
              <Text className="text-sm font-medium text-[#FF8383]">
                Sign up
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </AuthScaffold>
  );
}
