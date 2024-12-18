import { BottomNavigation } from '@/components/nav-menu';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <ScreenWrapper fullBackground={true}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="[details]" options={{ headerShown: false }} />
        <Stack.Screen name="messages" options={{ headerShown: false }} />
      </Stack>
    </ScreenWrapper>
  );
};

export default Layout;
