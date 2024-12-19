import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import {
  ChevronLeft,
  Briefcase,
  Coffee,
  Car,
  Home,
  Camera,
  Music,
  Book,
} from 'lucide-react-native';

const serviceIcons = {
  Business: Briefcase,
  'Food & Drink': Coffee,
  Transportation: Car,
  'Home Services': Home,
  Photography: Camera,
  Music: Music,
  Education: Book,
};

interface Listing {
  id: number;
  title: string;
  description: string;
  image: string;
  status: 'published' | 'draft';
  date: string;
}

interface CategoryListingsScreenProps {
  category: {
    name: string;
    icon: keyof typeof serviceIcons;
  };
  listings: Listing[];
  onBack: () => void;
}

const ListingItem: React.FC<Listing> = ({ title, description, image, status, date }) => (
  <View className="mb-4 rounded-xl bg-white p-4 shadow-lg">
    <Image source={{ uri: image }} className="mb-3 h-40 w-full rounded-xl" resizeMode="cover" />
    <Text className="mb-1 text-lg font-bold text-foreground">{title}</Text>
    <Text className="mb-2 text-secondary-foreground">{description}</Text>
    <View className="mb-2 flex-row items-center justify-between">
      <Text className="text-xs text-secondary-foreground">{date}</Text>
      <View
        className={`rounded-full px-2 py-1 ${status === 'published' ? 'bg-green-500' : 'bg-yellow-500'}`}>
        <Text className="text-xs capitalize text-white">{status}</Text>
      </View>
    </View>
    <View className="flex-row justify-between">
      <TouchableOpacity className="mr-2 flex-1 rounded-full bg-primary px-4 py-2">
        <Text className="text-center font-semibold text-white">View</Text>
      </TouchableOpacity>
      <TouchableOpacity className="ml-2 flex-1 rounded-full bg-secondary px-4 py-2">
        <Text className="text-center font-semibold text-secondary-foreground">Edit</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const CategoryListingsScreen: React.FC<CategoryListingsScreenProps> = ({
  category,
  listings,
  onBack,
}) => {
  const IconComponent = serviceIcons[category.icon];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-row items-center justify-between rounded-b-3xl bg-primary p-4">
        <TouchableOpacity onPress={onBack} className="p-2">
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-white">{category.name} Services</Text>
        <View className="w-8" /> {/* Placeholder for balance */}
      </View>

      <ScrollView className="flex-1 px-4 pt-6">
        <View className="mb-6 flex-row items-center">
          <View className="mr-4 rounded-2xl bg-primary/20 p-3">
            <IconComponent size={32} color="#FF6B35" />
          </View>
          <View>
            <Text className="text-2xl font-bold text-foreground">{category.name}</Text>
            <Text className="text-secondary-foreground">
              Your {category.name.toLowerCase()} listings
            </Text>
          </View>
        </View>

        {listings.map((listing) => (
          <ListingItem key={listing.id} {...listing} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryListingsScreen;
