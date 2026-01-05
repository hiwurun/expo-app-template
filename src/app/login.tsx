import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import useViewerContext from '@/user/useViewerContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Eye, EyeClosed, Lock, Mail, User } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

export default function Login() {
  const router = useRouter();
  const { login } = useViewerContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const onSignUp = useCallback(async () => {
    // 这里添加实际的注册逻辑
    await login();
    router.replace('/');
  }, [login, router]);

  const calculatePasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++;
    return Math.min(strength, 3);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordStrength(calculatePasswordStrength(text));
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#151316' }}>
      <ScrollView className="flex-1" contentContainerClassName="min-h-full">
        <View className="flex-1 items-center justify-center px-6 py-12">
          <View className="absolute right-8 top-32 h-24 w-24 rounded-full bg-purple-500/30 blur-3xl" />

          <View className="w-full max-w-md gap-8">
            {/* 标题区域 */}
            <View className="gap-2">
              <Text
                className="text-center font-semibold"
                style={{ color: '#EFEFEF', fontSize: 40, lineHeight: 60 }}
              >
                Get Started Free
              </Text>
              <Text
                className="text-center"
                style={{ color: '#A4A4A4', fontSize: 14 }}
              >
                Free Forever. No Credit Card Needed
              </Text>
            </View>

            {/* 表单区域 */}
            <View className="gap-6">
              {/* Your Name */}
              <View className="gap-2">
                <Text style={{ color: '#A4A4A4', fontSize: 14 }}>
                  Your Name
                </Text>
                <Input
                  placeholder="@yourname"
                  value={name}
                  onChangeText={setName}
                  leftIcon={<User />}
                  placeholderTextColor="#A4A4A4"
                  style={{ color: '#A4A4A4' }}
                />
              </View>

              {/* Email Address */}
              <View className="gap-2">
                <Text style={{ color: '#A4A4A4', fontSize: 14 }}>
                  Email Address
                </Text>
                <Input
                  placeholder="yourname@gmail.com"
                  value={email}
                  onChangeText={setEmail}
                  leftIcon={<Mail />}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#A4A4A4"
                  style={{ color: '#A4A4A4' }}
                />
              </View>

              {/* Password */}
              <View className="gap-2">
                <Text style={{ color: '#A4A4A4', fontSize: 14 }}>Password</Text>
                <Input
                  placeholder="Password"
                  value={password}
                  onChangeText={handlePasswordChange}
                  leftIcon={<EyeClosed />}
                  rightIcon={
                    password ? (
                      <View className="flex-row items-center gap-3">
                        <Pressable>
                          <Eye />
                        </Pressable>
                        {passwordStrength > 0 && (
                          <View className="flex-row items-center gap-0.5 rounded-full bg-background/20 px-2 py-1">
                            <View
                              className="h-0.5 w-2.5 rounded-full"
                              style={{
                                backgroundColor:
                                  passwordStrength >= 1 ? '#009606' : '#8F8F8F',
                              }}
                            />
                            <View
                              className="h-0.5 w-2.5 rounded-full"
                              style={{
                                backgroundColor:
                                  passwordStrength >= 2 ? '#4CAF50' : '#8F8F8F',
                              }}
                            />
                            <View
                              className="h-0.5 w-2.5 rounded-full"
                              style={{
                                backgroundColor:
                                  passwordStrength >= 3 ? '#8F8F8F' : '#8F8F8F',
                              }}
                            />
                            <Text
                              className="ml-1"
                              style={{ color: '#9FDBA1', fontSize: 10 }}
                            >
                              {passwordStrength === 3
                                ? 'Strong'
                                : passwordStrength === 2
                                  ? 'Medium'
                                  : 'Weak'}
                            </Text>
                          </View>
                        )}
                      </View>
                    ) : null
                  }
                  secureTextEntry
                  placeholderTextColor="#A4A4A4"
                  style={{ color: '#A4A4A4' }}
                />
              </View>
            </View>

            {/* Sign Up 按钮 */}
            <Pressable
              onPress={onSignUp}
              className="overflow-hidden rounded-2xl"
            >
              <LinearGradient
                colors={['#9C3FE4', '#C65647']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="h-12 items-center justify-center"
              >
                <Text
                  className="font-medium"
                  style={{ color: '#FFFFFF', fontSize: 18 }}
                >
                  Sign up
                </Text>
              </LinearGradient>
            </Pressable>

            {/* Or sign up with */}
            <View className="flex-row items-center gap-3">
              <View className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-600" />
              <Text style={{ color: '#B6B6B6', fontSize: 11 }}>
                Or sign up with
              </Text>
              <View className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-600" />
            </View>

            {/* 社交登录按钮 */}
            <View className="flex-row justify-center gap-4">
              {/* Google */}
              <Pressable className="h-11 w-14 items-center justify-center rounded-lg border border-input/20 bg-background/10 backdrop-blur-xl">
                <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                  <Path
                    d="M19.6 10.23c0-.82-.07-1.42-.22-2.05H10v3.72h5.51c-.11.88-.71 2.21-2.03 3.1l-.02.1 2.95 2.28.2.02c1.88-1.73 2.96-4.28 2.96-7.17"
                    fill="#4285F4"
                  />
                  <Path
                    d="M10 20c2.7 0 4.96-.89 6.62-2.42l-3.13-2.4c-.83.57-1.94.96-3.49.96-2.66 0-4.92-1.73-5.73-4.13l-.12.01-3.07 2.37-.04.11C2.62 17.8 6.03 20 10 20"
                    fill="#34A853"
                  />
                  <Path
                    d="M4.27 11.87c-.21-.62-.33-1.29-.33-1.98 0-.69.12-1.36.32-1.98l-.01-.11-3.11-2.41-.1.05A9.996 9.996 0 000 9.89c0 1.61.39 3.14 1.08 4.49l3.19-2.51"
                    fill="#FBBC05"
                  />
                  <Path
                    d="M10 3.88c1.88 0 3.15.81 3.87 1.49l2.81-2.74C14.95.99 12.7 0 10 0 6.03 0 2.62 2.2 1.04 5.5l3.23 2.52C5.08 5.61 7.34 3.88 10 3.88"
                    fill="#EB4335"
                  />
                </Svg>
              </Pressable>

              {/* LinkedIn */}
              <Pressable className="h-11 w-14 items-center justify-center rounded-lg border border-input/20 bg-background/10 backdrop-blur-xl">
                <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                  <Path
                    d="M0 1.43C0 .64.64 0 1.43 0h17.14C19.36 0 20 .64 20 1.43v17.14c0 .79-.64 1.43-1.43 1.43H1.43C.64 20 0 19.36 0 18.57V1.43z"
                    fill="#0A66C2"
                  />
                  <Path
                    d="M6.12 16.37V7.63H3.18v8.74h2.94zM4.65 6.46c1.03 0 1.67-.68 1.67-1.53-.02-.87-.64-1.53-1.65-1.53-1.01 0-1.67.66-1.67 1.53 0 .85.64 1.53 1.63 1.53h.02zM8.42 16.37h2.94v-4.88c0-.26.02-.53.1-.72.22-.53.71-1.08 1.54-1.08 1.09 0 1.52.83 1.52 2.04v4.64h2.94v-4.97c0-2.66-1.42-3.9-3.31-3.9-1.55 0-2.24.87-2.61 1.46h.02V7.63H8.42c.04.85 0 8.74 0 8.74z"
                    fill="#fff"
                  />
                </Svg>
              </Pressable>

              {/* Facebook */}
              <Pressable className="h-11 w-14 items-center justify-center rounded-lg border border-input/20 bg-background/10 backdrop-blur-xl">
                <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                  <Path
                    d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                    fill="#1877F2"
                  />
                  <Path
                    d="M13.893 12.89l.443-2.89h-2.773V8.124c0-.79.387-1.562 1.63-1.562h1.26v-2.46s-1.144-.195-2.238-.195c-2.285 0-3.777 1.384-3.777 3.89V10h-2.54v2.89h2.54v6.988a10.075 10.075 0 003.124 0V12.89h2.33z"
                    fill="#fff"
                  />
                </Svg>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
