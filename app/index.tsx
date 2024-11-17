import { Stack, Link } from 'expo-router';
import { Text, View} from 'react-native';

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';



export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <ScreenContent path="app/index.tsx" title="Home">
         <View className='h-40 w-full rounded-3xl bg-orange-700'>
            <Text className='text-white p-10 text-center font-bold text-4xl'>Fundi wangu</Text>
         </View>
        </ScreenContent>
        <Link href={{ pathname: '/details', params: { name: 'Dan' } }} asChild>
          <Button title="Show Details" />
        </Link>
      </Container>
    </>
  );
}