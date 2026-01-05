import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import useViewerContext from '@/user/useViewerContext';
import { useRouter } from 'expo-router';
import { Eye, EyeClosed, Mail, User } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <SafeAreaView className="flex-1 bg-white dark:bg-neutral-950">
      <ScrollView className="flex-1" contentContainerClassName="min-h-full">
        <View className="flex-1 items-center justify-center px-6 py-12">
          <View className="absolute right-8 top-32 h-24 w-24 rounded-full bg-purple-500/30 blur-3xl" />

          <View className="w-full max-w-md gap-8">
            {/* 标题区域 */}
            <View className="gap-2">
              <Text className="text-center text-[40px] font-semibold leading-[60px] text-neutral-950 dark:text-neutral-50">
                Get Started Free
              </Text>
              <Text className="text-center text-sm text-neutral-500 dark:text-neutral-400">
                Free Forever. No Credit Card Needed
              </Text>
            </View>

            {/* 表单区域 */}
            <View className="gap-6">
              {/* Your Name */}
              <View className="gap-2">
                <Text className="text-sm text-neutral-500 dark:text-neutral-400">
                  Your Name
                </Text>
                <Input
                  placeholder="@yourname"
                  value={name}
                  onChangeText={setName}
                  leftIcon={<User />}
                />
              </View>

              {/* Email Address */}
              <View className="gap-2">
                <Text className="text-sm text-neutral-500 dark:text-neutral-400">
                  Email Address
                </Text>
                <Input
                  placeholder="yourname@gmail.com"
                  value={email}
                  onChangeText={setEmail}
                  leftIcon={<Mail />}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Password */}
              <View className="gap-2">
                <Text className="text-sm text-neutral-500 dark:text-neutral-400">
                  Password
                </Text>
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
                />
              </View>
            </View>

            {/* Sign Up 按钮 */}
            <Pressable
              onPress={onSignUp}
              className="overflow-hidden rounded-2xl"
            >
              <Text className="text-lg font-medium">Sign up</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
