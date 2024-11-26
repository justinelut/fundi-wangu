import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Search, Sliders } from 'lucide-react-native';

const SearchBar = () => {
  return (
    <View className="flex-row items-center mb-4">
      <View className="flex-1 flex-row items-center bg-gray-100 rounded-lg p-2 mr-2">
        <Search size={20} color="#9CA3AF" />
        <TextInput
          className="flex-1 ml-2 text-base"
          placeholder="Search"
          placeholderTextColor="#9CA3AF"
        />
      </View>
      <TouchableOpacity className="bg-blue-500 p-3 rounded-lg">
        <Sliders size={20} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

