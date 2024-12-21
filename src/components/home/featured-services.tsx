import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { services } from './home-screen-data';
import { ServiceItem } from './service-item';
import { FeaturedCard } from './featured-item';

const FeaturedServices = () => {
  return (
    <View className="bg-background">
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="px-4 text-lg font-bold text-foreground">Featured Services</Text>
        <TouchableOpacity>
          <Text className="px-2 text-primary">See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={services}
        renderItem={({ item }) => <FeaturedCard item={item} />}
        contentContainerClassName="h-full flex gap-4 my-4 px-4"
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default FeaturedServices;
