import { BottomNavigation } from '@/components/nav-menu';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <ScreenWrapper fullBackground={true}>
      <Stack>
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="bookings" options={{ headerShown: false }} />
      </Stack>
    </ScreenWrapper>
  );
};

export default Layout;
