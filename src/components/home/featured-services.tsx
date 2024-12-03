import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Star } from 'lucide-react-native';
import { services } from './home-screen-data';
import { Link } from 'expo-router';

const ServiceItem = ({ item }) => (
  <View className="mb-4 max-h-[300px] min-h-[300px] w-[200px] flex-1  px-1">
    <Image source={{ uri: item.image }} className="mb-2 h-40 w-full rounded-lg" />
    <View className="mb-1 flex-row items-center">
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
    <Text className="mb-1 text-lg font-semibold text-foreground" numberOfLines={1}>
      {item.title}
    </Text>
    <View className="mb-2 flex-row items-center">
      <Text className="text-lg font-bold text-orange-500">${item.price}</Text>
      <Text className="ml-2 text-sm text-gray-500 line-through">${item.originalPrice}</Text>
    </View>
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center">
        <Image source={{ uri: item.provider.image }} className="mr-2 h-8 w-8 rounded-full" />
        <Text className="text-sm text-foreground">{item.provider.name}</Text>
      </View>
      <Link
        href={`/${item.id}`}
        className="rounded-lg bg-primary px-4 py-2">
        <Text className="font-semibold text-white">Book</Text>
      </Link>
    </View>
  </View>
);

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
