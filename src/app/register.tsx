import { AuthScaffold } from '@/components/AuthScaffold';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import useViewerContext from '@/user/useViewerContext';
import { useRouter } from 'expo-router';
import { Eye, EyeClosed, Lock, Mail, Phone } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

export default function Register() {
  const router = useRouter();
  const { login } = useViewerContext(); // Using login context for now as registration placeholder

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSignUp = useCallback(async () => {
    // Implement actual registration logic here
    await login();
    router.replace('/');
  }, [login, router]);

  return (
    <AuthScaffold bgTop={-280}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="flex-grow justify-end px-6 pb-12 pt-20"
      >
        <View className="w-full max-w-md gap-8">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-[38px] font-medium text-[#424242]">
              Sign up
            </Text>
            <View className="h-[3px] w-[74px] bg-[#FF8383]" />
          </View>

          {/* Form */}
          <View className="gap-5">
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
                containerClassName="bg-transparent border-0 border-b border-[#FF8383] rounded-none px-0 h-auto py-2"
                className="text-[#616161]"
              />
            </View>

            {/* Phone */}
            <View className="gap-2">
              <Text className="text-base font-medium text-[#616161]">
                Phone no
              </Text>
              <Input
                placeholder="+00 000-0000-000"
                value={phone}
                onChangeText={setPhone}
                leftIcon={<Phone size={24} color="#BDBDBD" />}
                keyboardType="phone-pad"
                containerClassName="bg-transparent border-0 border-b border-[#FF8383] rounded-none px-0 h-auto py-2"
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

            {/* Confirm Password */}
            <View className="gap-2">
              <Text className="text-base font-medium text-[#616161]">
                Confirm Password
              </Text>
              <Input
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                leftIcon={<Lock size={24} color="#BDBDBD" />}
                rightIcon={
                  <Pressable
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
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
          </View>

          {/* Action Button */}
          <Pressable
            onPress={onSignUp}
            className="mt-4 items-center justify-center rounded-xl bg-[#FF8383] py-3.5 shadow-sm active:opacity-90"
          >
            <Text className="text-lg font-semibold text-[#F8F8FF]">
              Create Account
            </Text>
          </Pressable>

          {/* Footer */}
          <View className="flex-row justify-center gap-1">
            <Text className="text-sm text-[#9E9E9E]">
              Already have an Account!
            </Text>
            <Pressable onPress={() => router.replace('/login')}>
              <Text className="text-sm font-medium text-[#FF8383]">Login</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </AuthScaffold>
  );
}
