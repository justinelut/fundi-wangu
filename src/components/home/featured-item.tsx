import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Star, Heart } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  item: {
    image: string;
    name: string;
    address: string;
    price: number;
    rating: number;
  };
  onPress: () => void;
}

const GradientOverlay = () => (
  <LinearGradient
    colors={['transparent', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,1)']}
    start={[0, 0]}
    end={[0, 1]}
    className="absolute bottom-0 size-full rounded-2xl"
  />
);

export const FeaturedCard = ({ item }: Props) => {
  return (
    <TouchableOpacity className="relative flex h-[300px] w-60 flex-col items-start rounded-2xl">
      {/* Background Image */}
      <Image source={{ uri: item.image }} className="size-full rounded-2xl" />

      {/* Gradient Overlay */}
      <GradientOverlay />

      {/* Rating Badge */}
      <View className="absolute right-5 top-5 flex flex-row items-center rounded-full bg-white/90 px-3 py-1.5">
        <Star color="#facc15" size={16} />
        <Text className="text-primary-300 ml-1 text-xs font-bold">{item.rating}</Text>
      </View>

      {/* Card Details */}
      <View className="absolute inset-x-5 bottom-5 flex flex-col items-start">
        <Text className="text-xl font-extrabold text-white" numberOfLines={1}>
          {item.name}
        </Text>
        <Text className="text-base font-medium text-white" numberOfLines={1}>
          {item.address}
        </Text>

        <View className="flex w-full flex-row items-center justify-between">
          <Text className="text-xl font-extrabold text-white">KSh {item.price}</Text>
          <Heart color="#fff" size={20} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
