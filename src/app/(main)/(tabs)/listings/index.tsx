import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import {
  Plus,
  X,
  Briefcase,
  Coffee,
  Car,
  Home,
  Camera,
  Music,
  Book,
  Edit,
  Eye,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const serviceIcons = {
  Business: Briefcase,
  'Food & Drink': Coffee,
  Transportation: Car,
  'Home Services': Home,
  Photography: Camera,
  Music: Music,
  Education: Book,
};

const categories = [
  {
    id: 1,
    name: 'Business',
    icon: 'Business',
    listings: [
      {
        id: 1,
        title: 'Financial Consulting',
        description: 'Expert advice for your business finances',
        image: 'https://picsum.photos/200/300?random=1',
        status: 'published',
        date: '2023-05-15',
      },
      {
        id: 2,
        title: 'Marketing Strategy',
        description: 'Boost your business with effective marketing',
        image: 'https://picsum.photos/200/300?random=8',
        status: 'draft',
        date: '2023-05-20',
      },
    ],
  },
  {
    id: 2,
    name: 'Food & Drink',
    icon: 'Food & Drink',
    listings: [
      {
        id: 3,
        title: 'Gourmet Coffee Delivery',
        description: 'Artisanal coffee at your doorstep',
        image: 'https://picsum.photos/200/300?random=2',
        status: 'published',
        date: '2023-05-10',
      },
      {
        id: 4,
        title: 'Healthy Meal Prep',
        description: 'Nutritious meals delivered weekly',
        image: 'https://picsum.photos/200/300?random=9',
        status: 'published',
        date: '2023-05-18',
      },
    ],
  },
  {
    id: 3,
    name: 'Transportation',
    icon: 'Transportation',
    listings: [
      {
        id: 5,
        title: 'Luxury Car Service',
        description: 'Travel in style and comfort',
        image: 'https://picsum.photos/200/300?random=3',
        status: 'published',
        date: '2023-05-12',
      },
      {
        id: 6,
        title: 'Airport Shuttle',
        description: 'Reliable airport transfers',
        image: 'https://picsum.photos/200/300?random=10',
        status: 'draft',
        date: '2023-05-22',
      },
    ],
  },
];

const ListingItem = ({ title, description, image, status, date }) => (
  <View className="mb-3 rounded-xl bg-white p-3 shadow">
    <View className="flex-row">
      <Image source={{ uri: image }} className="mr-3 h-20 w-20 rounded-lg" resizeMode="cover" />
      <View className="flex-1">
        <Text className="font-semibold text-foreground">{title}</Text>
        <Text className="mb-1 text-sm text-secondary-foreground">{description}</Text>
        <Text className="mb-2 text-xs text-secondary-foreground">{date}</Text>
      </View>
    </View>
    <View className="mt-2 flex-row justify-between">
      <TouchableOpacity className="rounded-full bg-primary px-3 py-1">
        <Text className="font-semibold text-white">View</Text>
      </TouchableOpacity>
      <TouchableOpacity className="rounded-full bg-secondary px-3 py-1">
        <Text className="font-semibold text-secondary-foreground">Edit</Text>
      </TouchableOpacity>
    </View>
    <View
      className={`absolute right-3 top-3 rounded-full px-2 py-1 ${status === 'published' ? 'bg-green-500' : 'bg-yellow-500'}`}>
      <Text className="text-xs text-white">{status}</Text>
    </View>
  </View>
);

const CategoryCard = ({ name, icon, listings }) => {
  const IconComponent = serviceIcons[icon];
  return (
    <View className="mb-4 rounded-3xl bg-white p-4 shadow-lg">
      <View className="mb-2 flex-row items-center">
        <View className="mr-4 rounded-2xl bg-primary/10 p-3">
          <IconComponent size={24} color="#FF6B35" />
        </View>
        <Text className="flex-1 text-lg font-bold text-foreground">{name}</Text>
      </View>
      {listings.map((listing) => (
        <ListingItem key={listing.id} {...listing} />
      ))}
      <TouchableOpacity className="self-start rounded-full bg-secondary px-4 py-2">
        <Text className="font-semibold text-secondary-foreground">See All</Text>
      </TouchableOpacity>
    </View>
  );
};

const CreateListingButton = () => {
  const [expanded, setExpanded] = useState(false);
  const animatedWidth = useSharedValue(60);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(animatedWidth.value),
    };
  });

  const handlePress = () => {
    if (expanded) {
      animatedWidth.value = 60;
    } else {
      animatedWidth.value = width - 32;
    }
    setExpanded(!expanded);
  };

  return (
    <Animated.View
      className="absolute bottom-6 right-4 overflow-hidden rounded-full bg-primary shadow-lg"
      style={[animatedStyle, { elevation: 5 }]}>
      <TouchableOpacity className="flex-row items-center justify-between p-4" onPress={handlePress}>
        {expanded ? (
          <>
            <Text className="flex-1 text-lg font-bold text-white">Create Listing</Text>
            <X size={24} color="#FFFFFF" />
          </>
        ) : (
          <Plus size={32} color="#FFFFFF" />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const ListingsPage = () => {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-4 pt-6">
        <Text className="mb-6 text-3xl font-bold text-foreground">Service Categories</Text>
        {categories.map((category) => (
          <CategoryCard key={category.id} {...category} />
        ))}
      </ScrollView>
      <CreateListingButton />
    </SafeAreaView>
  );
};

export default ListingsPage;
