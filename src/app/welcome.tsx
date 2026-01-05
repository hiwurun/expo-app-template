import { AuthScaffold } from '@/components/AuthScaffold';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

export default function Welcome() {
  const router = useRouter();

  return (
    <AuthScaffold bgTop={0}>
      <View className="flex-1 items-end justify-end px-6 pb-12">
        <View className="w-full gap-8">
          <View className="gap-4">
            <Text className="text-[40px] font-semibold leading-tight text-[#424242]">
              Welcome
            </Text>
            <Text className="text-sm leading-5 text-[#BDBDBD]">
              Lorem ipsum dolor sit amet consectetur. Lorem id sit
            </Text>
          </View>

          <View className="mt-12 flex-row justify-end">
            <Pressable
              onPress={() => router.push('/login')}
              className="flex-row items-center gap-4 active:opacity-70"
            >
              <Text className="text-sm font-medium text-[#9E9E9E]">
                Continue
              </Text>
              <View className="h-9 w-9 items-center justify-center rounded-full bg-[#FF8383] shadow-sm">
                <ArrowRight size={20} color="white" />
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </AuthScaffold>
  );
}
