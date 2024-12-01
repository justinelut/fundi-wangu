import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Bell } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const Header = () => {
  const router = useRouter();

  const handleNotificationClick = () => {
    router.push('/notifications/notifications'); // Navigate to the notifications screen
  };

  return (
    <View className="flex-row justify-between items-center px-4 py-6 bg-white shadow-md dark:bg-black dark:text-foreground text-white">
      {/* Left Section - Logo */}
      <View className="flex-row items-center">
        {/* <Image
          source={require('@/assets/icon.png')} // Replace with your logo
          className="w-8 h-8 mr-2"
        /> */}
        <Text className="text-xl font-bold dark:text-white">AppName</Text>
      </View>

      {/* Right Section - Notification Icons */}
      <View className="flex-row items-center">
        <TouchableOpacity onPress={handleNotificationClick}>
          <Bell size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
