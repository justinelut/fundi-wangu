import React, { ReactNode } from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home, Search, Heart, User, PlusCircle, MessageCircle } from 'lucide-react-native'; // Add new icon for Messages
import { usePathname, useRouter } from 'expo-router';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';
import { cn } from '@/lib/cn';
import * as NavigationBar from 'expo-navigation-bar';

const ROUTES = [
  { name: 'Home', icon: Home, path: '/home' },
  { name: 'Search', icon: Search, path: '/search' },
  { name: 'Add', icon: PlusCircle, path: '/add-listing' },
  { name: 'Messages', icon: MessageCircle, path: '/messages' },  // Replaced "Favorites" with "Messages"
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

  // Update navigation bar visibility and style based on the current route
  const setNavigationBarStyle = () => {
    if (pathname === '/home') {
      NavigationBar.setBackgroundColorAsync('#ffffff');
      NavigationBar.setButtonStyleAsync('dark');
    } else if (pathname === '/add-listing') {
      NavigationBar.setBackgroundColorAsync('#f97316');
      NavigationBar.setButtonStyleAsync('light');
    } else {
      NavigationBar.setBackgroundColorAsync('#ffffff');
      NavigationBar.setButtonStyleAsync('dark');
    }
  };

  // Call the function to update navigation bar when the screen changes
  React.useEffect(() => {
    setNavigationBarStyle();
  }, [pathname]);

  return (
    <View className="flex-1">
      {/* Main Content */}
      <View className="flex-1">{children}</View>

      {/* Bottom Navigation */}
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
            const isAddButton = route.name === 'Add';

            return (
              <Pressable
                key={route.name}
                onPress={() => navigateTo(route.path)}
                onPressIn={isAddButton ? handlePressIn : undefined}
                onPressOut={isAddButton ? handlePressOut : undefined}
                className="items-center justify-center"
              >
                {isAddButton ? (
                  <Animated.View
                    className="w-16 h-16 bg-blue-500 rounded-full items-center justify-center shadow-lg"
                    style={[animatedStyle, { marginTop: -20 }]}
                  >
                    <Icon size={28} color="white" />
                  </Animated.View>
                ) : (
                  <View className="items-center">
                    <Icon
                      size={24}
                      color={isActive ? '#f97316' : '#9ca3af'} // Replace with hardcoded colors
                    />
                    <Text
                      className={cn(
                        'text-xs mt-1',
                        isActive ? 'text-orange-500 font-medium' : 'text-gray-500'
                      )}
                    >
                      {route.name}
                    </Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
      </SafeAreaView>
    </View>
  );
};
