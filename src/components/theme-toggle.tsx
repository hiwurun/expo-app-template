import { Moon, Sun } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { Appearance, Pressable, View } from 'react-native';

export function ThemeToggle() {
  const { colorScheme } = useColorScheme();

  const handleToggle = () => {
    const newScheme = colorScheme === 'dark' ? 'light' : 'dark';
    Appearance.setColorScheme(newScheme);
  };

  const isDark = colorScheme === 'dark';

  return (
    <View className="absolute right-6 top-14 z-50">
      <Pressable
        onPress={handleToggle}
        className="rounded-full border border-neutral-200 bg-white p-2 dark:border-neutral-800 dark:bg-neutral-900"
      >
        {isDark ? (
          <Sun size={24} color="#fafafa" />
        ) : (
          <Moon size={24} color="#0a0a0a" />
        )}
      </Pressable>
    </View>
  );
}
