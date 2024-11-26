import { Stack, useLocalSearchParams } from 'expo-router';

import { Container } from '@/components/Container';
import { ScreenContent } from '@/components/ScreenContent';
import { useAuth } from '@/lib/appwriteprovider';
import { View } from 'react-native';

export default function Bookings() {
    const { user } = useAuth();

  return (
    <View className='min-h-full bg-white'>
      <Stack.Screen options={{ title: 'Details' }} />
      <Container>
        <ScreenContent path="screens/details.tsx" title={`Showing details for user ${user?.name}`} />
      </Container>
    </View>
  );
}