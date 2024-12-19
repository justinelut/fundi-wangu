import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
// Assuming the cn function is available
import { ChevronLeft } from 'lucide-react-native';
import { cn } from '@/lib/cn';

const ListingDescriptionDetailsScreen = () => {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [contact, setContact] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-4 py-4">
        <View className="relative">
          {/* Back button */}
          <TouchableOpacity className="absolute top-4 left-4 p-2">
            <ChevronLeft size={24} color="#000" />
          </TouchableOpacity>

          {/* Screen Title */}
          <Text className="text-3xl font-bold text-foreground mb-4">Describe Your Service</Text>
          <Text className="text-secondary-foreground mb-6">
            Enter details for your service listing.
          </Text>

          {/* Description Input */}
          <Text className="text-lg font-semibold text-foreground mb-2">Description</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Write a brief description of your service"
            className="border p-4 rounded-lg text-foreground mb-4"
            multiline
            numberOfLines={4}
          />

          {/* Location Input */}
          <Text className="text-lg font-semibold text-foreground mb-2">Location</Text>
          <TextInput
            value={location}
            onChangeText={setLocation}
            placeholder="Where is your service located?"
            className="border p-4 rounded-lg text-foreground mb-4"
          />

          {/* Price Input */}
          <Text className="text-lg font-semibold text-foreground mb-2">Price</Text>
          <TextInput
            value={price}
            onChangeText={setPrice}
            placeholder="Enter your service price"
            keyboardType="numeric"
            className="border p-4 rounded-lg text-foreground mb-4"
          />

          {/* Contact Info */}
          <Text className="text-lg font-semibold text-foreground mb-2">Contact Information</Text>
          <TextInput
            value={contact}
            onChangeText={setContact}
            placeholder="Enter a contact number or email"
            className="border p-4 rounded-lg text-foreground mb-6"
          />

          {/* Next Button */}
          <TouchableOpacity className={cn('bg-primary py-3 px-6 rounded-full')}>
            <Text className="text-white text-center font-semibold">Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListingDescriptionDetailsScreen;
