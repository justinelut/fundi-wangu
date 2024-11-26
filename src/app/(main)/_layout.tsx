import { BottomNavigation } from '@/components/nav-menu';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <ScreenWrapper fullBackground={true}>
      <BottomNavigation>
        <Stack>
          <Stack.Screen name="home" options={{ headerShown: false }} />
          <Stack.Screen name="bookings" options={{ headerShown: false }} />
        </Stack>
      </BottomNavigation>
    </ScreenWrapper>
  );
};

export default Layout;
