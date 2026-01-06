import { AuthScaffold } from '@/components/AuthScaffold';
import { Text } from '@/components/ui/text';
import { metadata } from '@/config/metadata';
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
            <Text className="text-[40px] font-semibold leading-tight text-foreground">
              欢迎
            </Text>
            <Text className="text-sm leading-5 text-muted-foreground">
              欢迎来到{metadata.name}，开始体验你的新旅程
            </Text>
          </View>

          <View className="mt-12 flex-row justify-end">
            <Pressable
              onPress={() => router.push('/login')}
              className="flex-row items-center gap-4 active:opacity-70"
            >
              <Text className="text-sm font-medium text-muted-foreground">
                继续
              </Text>
              <View className="h-9 w-9 items-center justify-center rounded-full bg-destructive shadow-sm">
                <ArrowRight size={20} color="hsl(0, 0%, 98%)" />
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </AuthScaffold>
  );
}
