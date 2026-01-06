import { Text } from '@/components/ui/text';
import { VStack } from '@nkzw/stack';

export default function Two() {
  // const { logout } = useViewerContext();

  return (
    <VStack flex1 padding={16}>
      <Text onPress={logout}>Logout</Text>
    </VStack>
  );
}
