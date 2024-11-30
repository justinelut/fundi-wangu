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
    <View className="flex-row justify-between items-center px-4 py-6 bg-white shadow-md">
      {/* Left Section - Logo */}
      <View className="flex-row items-center">
        {/* <Image
          source={require('@/assets/icon.png')} // Replace with your logo
          className="w-8 h-8 mr-2"
        /> */}
        <Text className="text-xl font-bold text-black">AppName</Text>
      </View>

      {/* Right Section - Notification Icons */}
      <View className="flex-row items-center">
        <TouchableOpacity onPress={handleNotificationClick}>
          <Bell size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
