import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { services } from './home-screen-data';
import { ServiceItem } from './service-item';



const FeaturedServices = () => {
  return (
    <View className='bg-background'>
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="px-2 text-lg font-bold text-foreground">Featured Services</Text>
        <TouchableOpacity>
          <Text className="px-2 text-primary">See All</Text>
        </TouchableOpacity>
      </View>
      <FlashList
        data={services}
        renderItem={({ item }) => <ServiceItem item={item} />}
        estimatedItemSize={300}
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default FeaturedServices;
