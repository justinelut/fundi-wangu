import { BottomNavigation } from '@/components/nav-menu';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <ScreenWrapper fullBackground={true}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false, animation: 'fade_from_bottom' }}
        />
      </Stack>
    </ScreenWrapper>
  );
};

export default Layout;
