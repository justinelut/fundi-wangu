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
  Edit,
  Eye,
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
      <TouchableOpacity className="mr-2 flex-1 flex-row items-center justify-center rounded-full bg-primary px-4 py-2">
        <Eye size={16} color="#FFFFFF" className="mr-2" />
        <Text className="text-center font-semibold text-white">View</Text>
      </TouchableOpacity>
      <TouchableOpacity className="ml-2 flex-1 flex-row items-center justify-center rounded-full bg-secondary px-4 py-2">
        <Edit size={16} color="#1A1A1A" className="mr-2" />
        <Text className="text-center font-semibold text-secondary-foreground">Edit</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const CategoryListingsScreen = () => {
  const serviceIcons = {
    Business: Briefcase,
    'Food & Drink': Coffee,
    Transportation: Car,
    'Home Services': Home,
    Photography: Camera,
    Music: Music,
    Education: Book,
  };

  const sampleCategory = {
    name: 'Business',
    icon: 'Business',
    bannerImage: 'https://placeimg.com/1000/500/business',
  };

  const sampleListings = [
    {
      id: 1,
      title: 'Business Consulting Services',
      description: 'We offer expert business consulting to help you grow your company.',
      image: 'https://placeimg.com/500/300/business',
      status: 'published',
      date: '2024-12-19',
    },
    {
      id: 2,
      title: 'Web Development Services',
      description:
        'Full-stack web development for businesses looking to create an online presence.',
      image: 'https://placeimg.com/500/300/business',
      status: 'draft',
      date: '2024-12-18',
    },
    {
      id: 3,
      title: 'Marketing Strategy Consulting',
      description: 'Tailored marketing strategies for small and medium-sized businesses.',
      image: 'https://placeimg.com/500/300/business',
      status: 'published',
      date: '2024-12-17',
    },
  ];

  const IconComponent = serviceIcons[sampleCategory.icon];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1">
        <View className="relative mt-6">
          <Image
            source={{ uri: sampleCategory.bannerImage }}
            className="h-48 w-full"
            resizeMode="cover"
          />
          <View className="absolute bottom-0 left-0 right-0 top-0 bg-black/50" />
          <TouchableOpacity
            onPress={() => {}}
            className="absolute left-4 top-4 rounded-full bg-white/20 p-2">
            <ChevronLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View className="-mt-16 mb-4 px-4">
          <View className="rounded-3xl bg-white p-4 shadow-lg">
            <View className="flex-row items-center">
              <View className="mr-4 rounded-2xl bg-primary/20 p-3">
                <IconComponent size={32} color="#FF6B35" />
              </View>
              <View>
                <Text className="text-2xl font-bold text-foreground">{sampleCategory.name}</Text>
                <Text className="text-secondary-foreground">
                  Your {sampleCategory.name.toLowerCase()} listings
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className="px-4">
          {sampleListings.map((listing) => (
            <ListingItem key={listing.id} {...listing} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryListingsScreen;
