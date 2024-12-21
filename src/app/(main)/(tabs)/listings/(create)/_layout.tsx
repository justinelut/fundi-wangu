import HeaderWithSearchBar from '@/components/home/header';
import { BottomNavigation } from '@/components/nav-menu';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { Link, Stack } from 'expo-router';
import { Bell, MessageCircle, Search } from 'lucide-react-native';
import { TouchableOpacity, View } from 'react-native';

const Layout = () => {
  return (
    <ScreenWrapper fullBackground={true}>
      <Stack>
        <Stack.Screen
          name="listing-details"
          options={{
            title: 'Listing details',
            headerLargeTitle: true,
            headerTransparent: true,
            headerBlurEffect: 'light',
            headerRight: () => (
              <View className="flex-row items-center gap-x-4 bg-black text-foreground">
                <TouchableOpacity>
                  <Search size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Stack.Screen name="listing-description" options={{ headerShown: false }} />
        <Stack.Screen name="listing-media" options={{ headerShown: false }} />
      </Stack>
    </ScreenWrapper>
  );
};

export default Layout;
