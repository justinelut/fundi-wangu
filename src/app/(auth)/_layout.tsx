import { ScreenWrapper } from '@/components/screen-wrapper';
import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <ScreenWrapper fullBackground={true}>
      <Stack>
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      </Stack>
    </ScreenWrapper>
  );
};

export default Layout;
