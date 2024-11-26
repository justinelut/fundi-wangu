import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MapPin, ShoppingCart, ChevronDown } from 'lucide-react-native';

const Header = () => {
  return (
    <View className="flex-row justify-between items-center mb-4">
      <View className="flex-row items-center">
        <MapPin size={24} color="#007AFF" />
        <View className="ml-2">
          <Text className="text-sm text-gray-500">Delivery Address</Text>
          <View className="flex-row items-center">
            <Text className="text-base font-semibold">2118 Thornridge California</Text>
            <ChevronDown size={16} color="#000" />
          </View>
        </View>
      </View>
      <TouchableOpacity className="relative">
        <ShoppingCart size={24} color="#000" />
        <View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
          <Text className="text-white text-xs">1</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

