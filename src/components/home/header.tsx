import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Bell, MessageCircle, Search } from 'lucide-react-native';
import { Link, useRouter } from 'expo-router';

const HeaderWithSearchBar = () => {
  const router = useRouter();

  const handleSearchClick = () => {
    // Navigate directly to the search route
    router.push('/(search)/search');
  };

  const handleNotificationClick = () => {
    router.push('/notifications/notifications');
  };

  return (
    <View className="relative">
      {/* Sticky Header */}
      <View className="flex-row items-center justify-between px-4 py-6 shadow-md sticky top-0 z-10 bg-background">
        {/* Left Section - Logo */}
        <View className="flex-row items-center">
          <Text className="text-xl font-bold dark:text-white">Fundi Wangu</Text>
        </View>

        {/* Right Section - Notification Icons */}
        <View className="flex-row items-center gap-x-4 text-foreground">
         
          <TouchableOpacity>
          <Link href="/(main)/messages">
            <MessageCircle size={24} color="#fff" />
            </Link>
          </TouchableOpacity>
         
          <TouchableOpacity onPress={handleNotificationClick}>
            <Bell size={24} color="#fff" />
          </TouchableOpacity>

          {/* Search Icon */}
          <TouchableOpacity onPress={handleSearchClick}>
            <Search size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content area that will be scrollable */}
      <View className="flex-1">
        {/* Content of the screen can go here */}
      </View>
    </View>
  );
};

export default HeaderWithSearchBar;
