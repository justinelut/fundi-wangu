import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Edit } from 'lucide-react-native';

export const ProfileSection = () => {
  return (
    <View className="bg-white p-4 rounded-xl shadow-md mb-6">
      <View className="flex-row items-center mb-4">
        {/* Profile Picture */}
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }} // Replace with dynamic user profile picture
          className="w-24 h-24 rounded-full border-2 border-gray-300"
        />
        <View className="ml-4">
          <Text className="text-xl font-semibold">John Doe</Text>
          <Text className="text-sm text-gray-500">johndoe@email.com</Text>
        </View>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity className="flex-row items-center justify-center bg-blue-600 py-2 px-4 rounded-full w-full mt-4">
        <Edit size={18} color="white" />
        <Text className="ml-2 text-white font-semibold">Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};
