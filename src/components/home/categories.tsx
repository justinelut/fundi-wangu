import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { categories } from './home-screen-data';

const CategoryItem = ({ item }) => {
  const Icon = item.icon; // Dynamically get the icon component

  return (
    <TouchableOpacity
      className="items-center mx-3 py-6 flex gap-x-4"
      
    >
      <Icon size={50} color="#f97316" />
      <Text className="text-xs font-medium mt-2 text-center">{item.name}</Text>
    </TouchableOpacity>
  );
};

const Categories = () => {
  return (
    <View className="mb-6">
      <View className="flex-row justify-between items-center mb-4 px-4">
        <Text className="text-lg font-bold">Explore Categories</Text>
        <TouchableOpacity>
          <Text className="text-orange-500 font-medium">See All</Text>
        </TouchableOpacity>
      </View>
      <FlashList
        data={categories}
        renderItem={({ item }) => <CategoryItem item={item} />}
        estimatedItemSize={100}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </View>
  );
};

export default Categories;
