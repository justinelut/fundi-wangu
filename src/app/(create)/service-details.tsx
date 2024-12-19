import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';
import { cn } from '@/lib/cn';
import { Picker } from '@react-native-picker/picker';

const categories = [
  'Plumbing',
  'Electrician',
  'Graphic Design',
  'Cleaning',
  'Carpentry',
  'Photography',
];

const ListingCreationScreen: React.FC = () => {
  const [serviceTitle, setServiceTitle] = useState('');
  const [category, setCategory] = useState('');

  const handleNext = () => {
    // Logic for navigating to the next step
  };

  const handleBack = () => {
    // Logic for going back to the previous screen
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="flex-1 px-4">
        {/* Header with Banner */}
        <View className="mb-6">
          <View className="mb-4 flex-row items-center justify-between">
            <TouchableOpacity onPress={handleBack} className="p-2">
              <ChevronLeft size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <Text className="mb-2 text-3xl font-bold text-foreground">Create Your Listing</Text>
          <Text className="mb-4 text-secondary-foreground">
            Please provide the title and category for your service.
          </Text>
        </View>

        {/* Service Title Input */}
        <View className="mb-6">
          <Text className="mb-2 text-lg font-medium text-foreground">Service Title</Text>
          <TextInput
            className="rounded-lg border border-gray-300 bg-white px-4 py-3"
            placeholder="Enter a title for your service"
            value={serviceTitle}
            onChangeText={setServiceTitle}
            maxLength={100}
          />
        </View>

        {/* Category Selection */}
        <View className="mb-6">
          <Text className="mb-2 text-lg font-medium text-foreground">Category</Text>
          <View className="rounded-lg border border-gray-300 bg-white">
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => setCategory(itemValue)}
              className="px-4 py-3">
              <Picker.Item label="Select Category" value="" />
              {categories.map((cat, index) => (
                <Picker.Item key={index} label={cat} value={cat} />
              ))}
            </Picker>
          </View>
        </View>

        {/* Next Button */}
        <TouchableOpacity
          onPress={handleNext}
          className={cn('mt-6 rounded-full bg-primary px-6 py-3')}>
          <Text className="text-center font-semibold text-white">Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListingCreationScreen;
