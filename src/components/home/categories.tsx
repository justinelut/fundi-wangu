import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { cn } from '@/lib/cn';

const categories = [
  {
    id: 1,
    name: 'Carpenter',
    image: 'https://cdn-icons-png.flaticon.com/512/1995/1995470.png'
  },
  {
    id: 2,
    name: 'Cleaner',
    image: 'https://cdn-icons-png.flaticon.com/512/995/995016.png'
  },
  {
    id: 3,
    name: 'Painter',
    image: 'https://cdn-icons-png.flaticon.com/512/1048/1048966.png'
  },
  {
    id: 4,
    name: 'Electrician',
    image: 'https://cdn-icons-png.flaticon.com/512/4635/4635363.png'
  },
  {
    id: 5,
    name: 'Beauty',
    image: 'https://cdn-icons-png.flaticon.com/512/1940/1940922.png'
  },
  {
    id: 6,
    name: 'AC Repair',
    image: 'https://cdn-icons-png.flaticon.com/512/1530/1530297.png'
  },
  {
    id: 7,
    name: 'Plumber',
    image: 'https://cdn-icons-png.flaticon.com/512/4635/4635427.png'
  },
  {
    id: 8,
    name: "Men's Salon",
    image: 'https://cdn-icons-png.flaticon.com/512/1995/1995450.png'
  }
];

const Categories = () => {
  return (
    <View className="px-4 py-6 bg-background">
      <View className="flex-row justify-between items-center mb-6">
        <Text className={cn(
          "text-2xl font-bold",
          "text-foreground"
        )}>
          All Categories
        </Text>
        <TouchableOpacity>
          <Text className={cn(
            "text-base font-medium",
            "text-primary"
          )}>
            See All
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View className="flex-row flex-wrap justify-between">
          {categories.map((category) => (
            <TouchableOpacity 
              key={category.id}
              className="w-[23%] mb-6"
            >
              <View className={cn(
                "aspect-square rounded-2xl mb-2",
                "bg-accent items-center justify-center"
              )}>
                <Image
                  source={{ uri: category.image }}
                  className="w-[60%] h-[60%]"
                  resizeMode="contain"
                />
              </View>
              <Text className={cn(
                "text-sm text-center",
                "text-foreground"
              )}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Categories;

