import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import {
  Building2,
  Store,
  Utensils,
  Car,
  Scissors,
  ShoppingBag,
  Heart,
  Map,
  Star,
  Search,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Mock data
const featuredListings = [
  {
    id: '1',
    image: 'https://via.placeholder.com/120',
    name: 'Featured Listing 1',
    category: 'Store',
    rating: 4.5,
    reviews: 10,
  },
  {
    id: '2',
    image: 'https://via.placeholder.com/120',
    name: 'Featured Listing 2',
    category: 'Restaurant',
    rating: 4.8,
    reviews: 20,
  },
];

const allListings = [
  {
    id: '3',
    image: 'https://via.placeholder.com/120',
    name: 'Listing 1',
    category: 'Building',
  },
  {
    id: '4',
    image: 'https://via.placeholder.com/120',
    name: 'Listing 2',
    category: 'Barber',
  },
];

const CategoryIcon = ({ name }: { name: string }) => {
  const icons: { [key: string]: JSX.Element } = {
    building: <Building2 />,
    store: <Store />,
    restaurant: <Utensils />,
    car: <Car />,
    barber: <Scissors />,
    shop: <ShoppingBag />,
    heart: <Heart />,
    map: <Map />,
    star: <Star />,
    search: <Search />,
  };

  return (
    <View className="p-4">
      {icons[name] || <Search />}
    </View>
  );
};

const FeaturedCard = ({ item }: { item: typeof featuredListings[number] }) => {
  return (
    <TouchableOpacity className="bg-white shadow rounded-lg m-2" style={{ width: width - 40 }}>
      <Image source={{ uri: item.image }} style={{ width: '100%', height: 120 }} resizeMode="cover" />
      <View className="p-4">
        <Text className="font-bold">{item.name}</Text>
        <Text className="text-gray-600">{item.category}</Text>
        <Text className="text-yellow-500">{item.rating} ⭐ ({item.reviews} reviews)</Text>
      </View>
    </TouchableOpacity>
  );
};

const ListingCard = ({ item }: { item: typeof allListings[number] }) => {
  return (
    <TouchableOpacity className="bg-white shadow rounded-lg m-2 p-4">
      <Image source={{ uri: item.image }} style={{ width: '100%', height: 120 }} resizeMode="cover" />
      <Text className="font-bold">{item.name}</Text>
      <Text className="text-gray-600">{item.category}</Text>
    </TouchableOpacity>
  );
};

export default function App() {
  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="dark" />

      <ScrollView>
        <View className="pt-24" />

        
        <View className="flex-row justify-around mb-4">
          {['building', 'store', 'restaurant', 'car', 'barber'].map((category) => (
            <CategoryIcon key={category} name={category} />
          ))}
        </View>

        {/* Featured Listings Section */}
        {featuredListings.length > 0 && (
          <View className="mt-8">
            <Text className="text-2xl font-bold text-gray-900 mx-4 mb-4">Featured</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {featuredListings.map((item) => (
                <FeaturedCard key={item.id} item={item} />
              ))}
            </ScrollView>
          </View>
        )}

        {/* All Listings Section */}
        <View className="mt-8 mb-4">
          <Text className="text-2xl font-bold text-gray-900 mx-4 mb-4">All Listings</Text>
          {allListings.map((item) => (
            <ListingCard key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
