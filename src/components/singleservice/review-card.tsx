import React from 'react';
import { View, Text, Image } from 'react-native';
import { Star } from 'lucide-react-native';

interface ReviewCardProps {
  name: string;
  date: string;
  review: string;
}

const ReviewCard = ({ name, date, review }: ReviewCardProps) => {
  return (
    <View className="mb-4 pb-4 border-b border-gray-200 last:border-b-0">
      <View className="flex-row items-center mb-2">
        <Image 
          source={{uri: 'https://images.pexels.com/photos/634005/pexels-photo-634005.jpeg?auto=compress&cs=tinysrgb&w=100'}} 
          className="w-10 h-10 rounded-full"
        />
        <View className="ml-3 flex-1">
          <Text className="font-semibold">{name}</Text>
          <View className="flex-row items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                color="#FFD700"
                fill="#FFD700"
              />
            ))}
          </View>
        </View>
        <Text className="text-gray-500">{date}</Text>
      </View>
      <Text className="text-gray-600">{review}</Text>
    </View>
  );
};

export default ReviewCard;

