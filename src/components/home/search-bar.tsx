import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Search, Sliders } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const SearchBar = () => {
  const router = useRouter();
  const width = useSharedValue(1); // Animation for search bar expansion

  const animatedStyle = useAnimatedStyle(() => ({
    flex: withTiming(width.value, { duration: 300 }),
  }));

  const handleFocus = () => {
    width.value = 1.5; // Expand search bar
    router.push('/(search)/search');
  };

  return (
    <View className="flex-row items-center mb-4">
      <Animated.View
        style={[animatedStyle]}
        className="flex-row items-center bg-gray-100 rounded-lg p-2 mr-2"
      >
        <Search size={20} color="#9CA3AF" />
        <TextInput
          className="flex-1 ml-2 text-base"
          placeholder="Search"
          placeholderTextColor="#9CA3AF"
          onFocus={handleFocus}
        />
      </Animated.View>
      <TouchableOpacity className="bg-blue-500 p-3 rounded-lg">
        <Sliders size={20} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
