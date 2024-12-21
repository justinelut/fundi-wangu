import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  Alert,
  Dimensions,
  Platform,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import Animated, { 
  FadeInDown, 
  FadeOutUp,
  SlideInRight,
  Layout
} from 'react-native-reanimated';
import { ChevronLeft, Camera, X, Image as ImageIcon } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { cn } from '@/lib/cn';

const { width } = Dimensions.get('window');
const IMAGE_SIZE = (width - 48) / 2;

interface ImageData {
  id: string;
  uri: string;
}

const ListingMediaUploadScreen = () => {
  const [images, setImages] = useState<ImageData[]>([]);

  // Request for image picker permissions
  const requestImagePermission = async () => {
    if (Platform.OS !== 'web') {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        Alert.alert(
          'Permission Required',
          'You need to grant permission to access your photos.',
          [{ text: 'OK', style: 'default' }]
        );
      }
    }
  };

  // Function to handle image selection
  const handleImageUpload = async () => {
    await requestImagePermission();

    if (images.length >= 5) {
      Alert.alert(
        'Maximum Reached',
        'You can only select up to 5 images.',
        [{ text: 'Got it', style: 'default' }]
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      const newImage: ImageData = {
        id: Date.now().toString(),
        uri: result.assets[0].uri
      };
      setImages(prev => [...prev, newImage]);
    }
  };

  // Function to remove image
  const handleRemoveImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View className="px-4 py-2 flex-row items-center border-b border-gray-100">
        <TouchableOpacity 
          className="p-2 rounded-full bg-gray-100"
          activeOpacity={0.7}
        >
          <ChevronLeft size={24} color="#F57C00"  />
        </TouchableOpacity>
        <Text className="ml-4 text-xl font-semibold text-gray-800">
          Add Photos
        </Text>
      </View>

      {/* Main Content */}
      <View className="flex-1 px-4 pt-4">
        {/* Instructions */}
        <Text className="text-gray-600 mb-6">
          Add up to 5 high-quality photos to showcase your service in the best way possible.
        </Text>

        {/* Upload Button */}
        <TouchableOpacity
          className={cn(
            'border-2 border-dashed border-gray-300 rounded-2xl p-8 mb-6',
            'bg-white shadow-sm',
            images.length === 0 ? 'h-60' : 'h-40'
          )}
          onPress={handleImageUpload}
          activeOpacity={0.7}
        >
          <Animated.View 
            className="items-center justify-center flex-1"
            entering={FadeInDown}
          >
            <View className="bg-primary/10 p-4 rounded-full mb-4">
              <ImageIcon size={32} color="#F57C00" />
            </View>
            <Text className="text-gray-900 font-semibold text-lg mb-2">
              {images.length === 0 ? 'Add Your First Photo' : 'Add More Photos'}
            </Text>
            <Text className="text-gray-500 text-center">
              {`${5 - images.length} slots remaining`}
            </Text>
          </Animated.View>
        </TouchableOpacity>

        {/* Image Grid */}
        <View className="flex-row flex-wrap justify-between">
          {images.map((image, index) => (
            <Animated.View
              key={image.id}
              entering={SlideInRight.delay(index * 100)}
              layout={Layout.springify()}
              className="mb-4"
            >
              <Image
                source={{ uri: image.uri }}
                className="rounded-xl"
                style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
              />
              <TouchableOpacity
                className="absolute top-2 right-2 bg-black/50 rounded-full p-2"
                onPress={() => handleRemoveImage(image.id)}
                activeOpacity={0.7}
              >
                <X size={16} color="#FFF" />
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </View>

      {/* Fixed Bottom Button */}
      <BlurView
        intensity={100}
        className="border-t border-gray-200 px-4 py-4"
      >
        <TouchableOpacity
          className={cn(
            'py-4 rounded-xl',
            images.length > 0 ? 'bg-blue-500' : 'bg-gray-300'
          )}
          disabled={images.length === 0}
          activeOpacity={0.7}
        >
          <Text className="text-white font-semibold text-center">
            Next ({images.length}/5)
          </Text>
        </TouchableOpacity>
      </BlurView>
    </SafeAreaView>
  );
};

export default ListingMediaUploadScreen;