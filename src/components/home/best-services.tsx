import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { services } from './home-screen-data';
import { ServiceItem } from './service-item';

const BestServices = () => {
  return (
    <View className="bg-background px-1">
      <View className="mb-2 flex-row items-center justify-between">
        <Text className="px-1 text-lg font-bold">Best Services</Text>
        <TouchableOpacity>
          <Text className="px-1 text-primary">See All</Text>
        </TouchableOpacity>
      </View>
      <FlashList
        data={services}
        renderItem={({ item }) => <ServiceItem item={item} />}
        estimatedItemSize={300}
        numColumns={2} // Two items per row
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default BestServices;
