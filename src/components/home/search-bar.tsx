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
    <View className="mb-4 flex-row items-center sticky">
      <Animated.View style={[animatedStyle]} className="mr-2 flex-row items-center rounded-lg  p-2">
        <Search size={20} color="#9CA3AF" />
        <TextInput
          className="ml-2 flex-1 text-base"
          placeholder="Search"
          placeholderTextColor="#9CA3AF"
          onFocus={handleFocus}
        />
      </Animated.View>
      <TouchableOpacity className="rounded-lg p-3 dark:bg-primary">
        <Sliders size={20} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
