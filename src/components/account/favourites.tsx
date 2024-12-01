import { Heart } from 'lucide-react-native';
import { Text, View } from 'react-native';

export const FavouritesSection = () => {
  return (
    <View className="bg-white p-4 rounded-xl shadow-md mb-6">
      <Text className="text-xl font-semibold mb-4">Favourites</Text>

      {/* Sample Favourites Items */}
      <View className="flex-row space-x-4">
        <View className="w-24 h-24 bg-gray-200 rounded-xl justify-center items-center">
          <Heart size={24} color="#FF4747" />
        </View>
        <View className="w-24 h-24 bg-gray-200 rounded-xl justify-center items-center">
          <Heart size={24} color="#FF4747" />
        </View>
      </View>
    </View>
  );
};
