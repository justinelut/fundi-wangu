import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Star } from 'lucide-react-native';
import { services } from './home-screen-data';
import { Link } from 'expo-router';

const ServiceItem = ({ item }) => (
  <View className="mb-4 max-h-[300px] min-h-[300px] flex-1 px-1">
    <Image source={{ uri: item.image }} className="w-full h-40 rounded-lg mb-2" />
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
    <Text className="text-lg font-semibold mb-1" numberOfLines={1}>
      {item.title}
    </Text>
    <View className="flex-row items-center mb-2">
      <Text className="text-lg font-bold text-blue-500">${item.price}</Text>
      <Text className="ml-2 text-sm text-gray-500 line-through">
        ${item.originalPrice}
      </Text>
    </View>
    <View className="flex-row justify-between items-center">
      <View className="flex-row items-center">
        <Image source={item.provider.image} className="w-8 h-8 rounded-full mr-2" />
        <Text className="text-sm">{item.provider.name}</Text>
      </View>
      <Link href={`/${item.id}`} className="bg-primary-600 px-4 py-2 rounded-lg">
        <Text className="text-white font-semibold">Book</Text>
      </Link>
    </View>
  </View>
);

const BestServices = () => {
  return (
    <View className='px-1'>
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-bold px-1">Best Services</Text>
        <TouchableOpacity>
          <Text className="text-green-600 px-1">See All</Text>
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
