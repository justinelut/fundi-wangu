import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { cn } from '@/lib/cn';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/lib/appwrite';

const categories = [
  {
    id: 1,
    name: 'Carpenter',
    image: 'https://cdn-icons-png.flaticon.com/512/1995/1995470.png',
  },
  {
    id: 2,
    name: 'Cleaner',
    image: 'https://cdn-icons-png.flaticon.com/512/995/995016.png',
  },
  {
    id: 3,
    name: 'Painter',
    image: 'https://cdn-icons-png.flaticon.com/512/1048/1048966.png',
  },
  {
    id: 4,
    name: 'Electrician',
    image: 'https://cdn-icons-png.flaticon.com/512/4635/4635363.png',
  },
  {
    id: 5,
    name: 'Beauty',
    image: 'https://cdn-icons-png.flaticon.com/512/1940/1940922.png',
  },
  {
    id: 6,
    name: 'AC Repair',
    image: 'https://cdn-icons-png.flaticon.com/512/1530/1530297.png',
  },
  {
    id: 7,
    name: 'Plumber',
    image: 'https://cdn-icons-png.flaticon.com/512/4635/4635427.png',
  },
  {
    id: 8,
    name: "Men's Salon",
    image: 'https://cdn-icons-png.flaticon.com/512/1995/1995450.png',
  },
];

const Categories = () => {
  const { data, error, isFetching } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories({ limit: 8 }),
  });

  if (isFetching) {
    console.log('fetching');
  }
  console.log(data);
  return (
    <View className="bg-background px-4 py-6">
      <View className="mb-6 flex-row items-center justify-between">
        <Text className={cn('text-2xl font-bold', 'text-foreground')}>All Categories</Text>
        <TouchableOpacity>
          <Text className={cn('text-base font-medium', 'text-primary')}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {isFetching ? (
          <View className="flex h-[200px] items-center justify-center bg-white">
            <ActivityIndicator className="size-30 text-primary" size={45} />
          </View>
        ) : (
          <View className="flex-row flex-wrap justify-between">
            {data &&
              data.map((category) => (
                <TouchableOpacity key={category.id} className="mb-6 w-[23%]">
                  <View
                    className={cn(
                      'mb-2 aspect-square rounded-2xl',
                      'items-center justify-center bg-accent'
                    )}>
                    <Image
                      source={{ uri: category.icon }}
                      className="h-[60%] w-[60%]"
                      resizeMode="contain"
                    />
                  </View>
                  <Text className={cn('text-center text-sm', 'text-foreground')}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Categories;
