import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import FeaturedServices from '@/components/home/featured-services';

const recommendations = [
  { id: '1', title: 'Plumbing Services' },
  { id: '2', title: 'Electricians' },
  { id: '3', title: 'Carpenters' },
  { id: '4', title: 'Home Cleaning' },
  { id: '5', title: 'Painting Services' },
];

const SearchScreen = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState(recommendations);

  const translateX = useSharedValue(300); // Start off-screen for animation
  const opacity = useSharedValue(0);

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(translateX.value, { duration: 500 }) }],
    opacity: withTiming(opacity.value, { duration: 500 }),
  }));

  useEffect(() => {
    translateX.value = 0; // Slide into view
    opacity.value = 1; // Fade in
  }, []);

  const handleSearch = (text: string) => {
    setQuery(text);
    setSuggestions(
      recommendations.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View className="h-full bg-background text-foreground">
      <View className="flex-row items-center p-4">
        <TouchableOpacity onPress={handleBack} className="mr-4">
          <Text className='text-foreground'>Back</Text>
        </TouchableOpacity>
        <TextInput
          value={query}
          onChangeText={handleSearch}
          autoFocus
          placeholder="Search"
          className="flex-1 bg-gray-100 p-2 rounded-lg"
        />
      </View>

      <Animated.View style={[animatedStyle]} className="mt-4 text-foreground">
        <Text className="font-semibold text-lg mb-2 text-foreground px-4">Recommended Services</Text>
        <FlashList
          horizontal
          data={recommendations}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="bg-gray-100 rounded-lg p-4 mr-4 shadow-sm"
              onPress={() => console.log(item.title)}
            >
              <Text className="text-sm font-medium">{item.title}</Text>
            </TouchableOpacity>
          )}
          estimatedItemSize={80}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />
      </Animated.View>

      {/* Main ScrollView to allow content to scroll */}
      <ScrollView className="mt-4 flex-1 px-4">
        <Text className="font-semibold text-lg mb-2 text-foreground">Search Results</Text>
        {suggestions.length > 0 ? (
          suggestions.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="py-4 border-b border-gray-200"
              onPress={() => console.log(item.title)}
            >
              <Text className='text-foreground'>{item.title}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <View className="p-4">
            <Text>No results found</Text>
          </View>
        )}

        {/* Featured Services Component */}
        <View className="mt-6">
          <FeaturedServices />
        </View>
      </ScrollView>
    </View>
  );
};

export default SearchScreen;
