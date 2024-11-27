import React, { ReactNode } from 'react';
import { View, Text, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home, Grid, Calendar, User, MessageCircle, NotepadText, LayoutGrid } from 'lucide-react-native';
import { usePathname, useRouter } from 'expo-router';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';
import { cn } from '@/lib/cn';
import * as NavigationBar from 'expo-navigation-bar';

const ROUTES = [
  { name: 'Home', icon: Home, path: '/home' },
  { name: 'Categories', icon: LayoutGrid, path: '/categories' },
  { name: 'Bookings', icon: NotepadText, path: '/bookings' },
  { name: 'Messages', icon: MessageCircle, path: '/messages' },
  { name: 'Profile', icon: User, path: '/profile' },
];

interface BottomNavigationProps {
  children: ReactNode;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(1.2, { damping: 10, stiffness: 150 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 150 });
  };

  const navigateTo = (path: string) => {
    router.push(path);
  };

  React.useEffect(() => {
    if (pathname === '/home') {
      NavigationBar.setBackgroundColorAsync('#ffffff');
      NavigationBar.setButtonStyleAsync('dark');
    } else if (pathname === '/bookings') {
      NavigationBar.setBackgroundColorAsync('#f97316');
      NavigationBar.setButtonStyleAsync('light');
    } else {
      NavigationBar.setBackgroundColorAsync('#ffffff');
      NavigationBar.setButtonStyleAsync('dark');
    }
  }, [pathname]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <View className="flex-1">{children}</View>

      <SafeAreaView
        edges={['bottom']}
        style={{
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <View className="flex-row justify-between items-center px-4 py-3">
          {ROUTES.map((route) => {
            const Icon = route.icon;
            const isActive = pathname === route.path;

            return (
              <Pressable
                key={route.name}
                onPress={() => navigateTo(route.path)}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                className="items-center justify-center"
              >
                <View className="items-center">
                  <View className={` ${isActive && 'bg-primary-200 rounded-full px-4 py-1'}`}>
                  <Icon
                    size={24}
                    color={isActive ? '#f97316' : '#9ca3af'}
                  />
                  </View>
                  <Text
                    className={cn(
                      'text-xs mt-1',
                      isActive ? 'text-orange-500 font-medium' : 'text-gray-500'
                    )}
                  >
                    {route.name}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
