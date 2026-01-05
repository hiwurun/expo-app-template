import Stack, { VStack } from '@nkzw/stack';
import { Stack as ExpoStack } from 'expo-router';
import { View } from 'react-native';
import { cx } from '../../../lib/cx.tsx';
import Text from '../../../ui/Text.tsx';

export default function Index() {
  return (
    <>
      <ExpoStack.Screen
        options={{ title: 'Home' }}
      />
      <VStack alignCenter center flex1 gap={16} padding>
        <Text className="text-center text-xl font-bold color-accent">
          Welcome
        </Text>
        <Text className="text-center italic">
          Modern, sensible defaults, fast.
        </Text>
        <Stack alignCenter center gap={4}>
          <Text className="text-center">
            Change{' '}
            <View
              className={cx(
                'inline-flex rounded border border-accent bg-subtle p-1',
                'android:translate-y-[9px] ios:translate-y-[9px]',
              )}
            >
              <Text>src/app/(app)/(tabs)/index.tsx</Text>
            </View>{' '}
            for live updates.
          </Text>
        </Stack>
      </VStack>
    </>
  );
}
