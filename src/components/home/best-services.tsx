import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Star } from 'lucide-react-native';
import { services } from './home-screen-data';

const ServiceItem = ({ item }) => (
  <View className="mb-4 max-h-[300px] min-h-[300px] w-full">
    <Image source={{uri: item.image}} className="w-full h-40 rounded-lg mb-2" />
    <View className="flex-row items-center mb-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={16}
          color={index < item.rating ? '#FFC107' : '#E0E0E0'}
          fill={index < item.rating ? '#FFC107' : '#E0E0E0'}
        />
      ))}
      <Text className="ml-1 text-sm text-gray-500">({item.reviews} Reviews)</Text>
    </View>
    <Text className="text-lg font-semibold mb-1" numberOfLines={1}>{item.title}</Text>
    <View className="flex-row items-center mb-2">
      <Text className="text-lg font-bold text-blue-500">${item.price}</Text>
      <Text className="ml-2 text-sm text-gray-500 line-through">${item.originalPrice}</Text>
    </View>
    <View className="flex-row justify-between items-center">
      <View className="flex-row items-center">
        <Image source={item.provider.image} className="w-8 h-8 rounded-full mr-2" />
        <Text className="text-sm">{item.provider.name}</Text>
      </View>
      
    </View>
    <TouchableOpacity className="bg-primary-600 px-4 py-2 rounded-lg">
        <Text className="text-white font-semibold">Book</Text>
      </TouchableOpacity>
  </View>
);

const BestServices = () => {
  return (
    <View>
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-bold">Best Services</Text>
        <TouchableOpacity>
          <Text className="text-blue-500">See All</Text>
        </TouchableOpacity>
      </View>
      <View className='h-[400px] flex gap-x-4'>
      <FlashList
        data={services}
        renderItem={({ item }) => <ServiceItem item={item} />}
        estimatedItemSize={300}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        className='flex gap-x-4 space-x-4'
        
      />
      </View>
    </View>
  );
};

export default BestServices;
