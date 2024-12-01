import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { ArrowLeft, Star, Phone, MessageSquare, Map, Share2 } from 'lucide-react-native';
import ReviewCard from './review-card';

const ServiceDetail = () => {
  return (
    <>
      {/* Header */}
      <View className="flex-row items-center p-4 border-b border-gray-200">
        <TouchableOpacity className="mr-4">
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold">Service Details</Text>
      </View>

      <ScrollView className='py-20 h-full'>
        {/* Hero Image */}
        <Image 
          source={{uri: 'https://images.pexels.com/photos/634005/pexels-photo-634005.jpeg?auto=compress&cs=tinysrgb&w=100'}} 
          className="w-full h-[400px] aspect-square object-cover"
          
        />

        {/* Rating and Title */}
        <View className="p-4">
          <View className="flex-row items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={20} 
                color="#FFD700"
                fill="#FFD700"
              />
            ))}
            <Text className="ml-2 text-gray-600">(240 Reviews)</Text>
          </View>
          <Text className="text-2xl font-bold mb-2">Living Room Cleaning</Text>
          <View className="flex-row items-center">
            <Text className="text-2xl font-bold">$200</Text>
            <Text className="ml-2 text-gray-500 line-through">$230</Text>
          </View>
        </View>

        {/* Description */}
        <View className="p-4 border-t border-gray-200">
          <Text className="text-lg font-bold mb-2">Descriptions</Text>
          <Text className="text-gray-600 leading-6">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letter
          </Text>
        </View>

        {/* Action Buttons */}
        <View className="flex-row justify-between px-4 py-6 border-t border-gray-200">
          <TouchableOpacity className="items-center">
            <View className="w-12 h-12 bg-blue-50 rounded-full items-center justify-center mb-1">
              <Phone size={24} color="#007AFF" />
            </View>
            <Text className="text-sm">Call</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <View className="w-12 h-12 bg-blue-50 rounded-full items-center justify-center mb-1">
              <MessageSquare size={24} color="#007AFF" />
            </View>
            <Text className="text-sm">Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <View className="w-12 h-12 bg-blue-50 rounded-full items-center justify-center mb-1">
              <Map size={24} color="#007AFF" />
            </View>
            <Text className="text-sm">Map</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <View className="w-12 h-12 bg-blue-50 rounded-full items-center justify-center mb-1">
              <Share2 size={24} color="#007AFF" />
            </View>
            <Text className="text-sm">Share</Text>
          </TouchableOpacity>
        </View>

        {/* Service Provider */}
        <View className="p-4 border-t border-gray-200">
          <Text className="text-lg font-bold mb-4">About Service Provider</Text>
          <View className="flex-row items-center">
            <Image 
              source={{uri: 'https://images.pexels.com/photos/634005/pexels-photo-634005.jpeg?auto=compress&cs=tinysrgb&w=100'}} 
              className="w-12 h-12 rounded-full"
            />
            <View className="ml-3">
              <Text className="font-semibold">Ronald Richards</Text>
              <Text className="text-gray-600">Service Provider</Text>
            </View>
          </View>
        </View>

        {/* Reviews */}
        <View className="p-4 border-t border-gray-200">
          <Text className="text-lg font-bold mb-4">Reviews</Text>
          <ReviewCard 
            name="Perry Wilson"
            date="04 Apr 2023"
            review="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
          />
          <ReviewCard 
            name="Robert Fox"
            date="03 Apr 2023"
            review="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
          />
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View className="flex-row justify-between items-center p-4 border-t border-gray-200">
        <View>
          <Text className="text-gray-600">Price</Text>
          <Text className="text-2xl font-bold">$200</Text>
        </View>
        <TouchableOpacity className="bg-blue-500 px-8 py-3 rounded-lg">
          <Text className="text-white font-semibold">Book Service</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ServiceDetail;

