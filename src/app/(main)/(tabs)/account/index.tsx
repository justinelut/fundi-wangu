import React from 'react';
import { View, Text, Image, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { Camera, Lock, Book, MapPin, Eye, FileText, Shield, LogOut, ArrowRight } from 'lucide-react-native';

const AccountPage = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  const toggleSwitch = () => setDarkMode((previousState) => !previousState);

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="items-center mt-10">
        <Image
          source={{ uri: 'https://example.com/profile.jpg' }} // Replace with a valid image URL
          className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg"
        />
        <Text className="text-2xl font-bold mt-3 text-gray-800">Smith Johnson</Text>
      </View>

      <View className="mt-6 bg-white rounded-lg shadow-md">
        <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-300">
          <Camera className="text-gray-600" size={24} />
          <Text className="ml-2 text-base text-gray-800">Edit Profile</Text>
          <ArrowRight className="text-gray-400" size={24} />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-300">
          <Lock className="text-gray-600" size={24} />
          <Text className="ml-2 text-base text-gray-800">Change Password</Text>
          <ArrowRight className="text-gray-400" size={24} />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-300">
          <Book className="text-gray-600" size={24} />
          <Text className="ml-2 text-base text-gray-800">My Bookings</Text>
          <ArrowRight className="text-gray-400" size={24} />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-300">
          <MapPin className="text-gray-600" size={24} />
          <Text className="ml-2 text-base text-gray-800">My Addresses</Text>
          <ArrowRight className="text-gray-400" size={24} />
        </TouchableOpacity>

        <View className="flex-row items-center justify-between p-4 border-b border-gray-300">
          <Eye className="text-gray-600" size={24} />
          <Text className="ml-2 text-base text-gray-800">Dark Mode</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={darkMode ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={darkMode}
          />
        </View>

        <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-300">
          <Shield className="text-gray-600" size={24} />
          <Text className="ml-2 text-base text-gray-800">Privacy Policy</Text>
          <ArrowRight className="text-gray-400" size={24} />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-300">
          <FileText className="text-gray-600" size={24} />
          <Text className="ml-2 text-base text-gray-800">Terms & Conditions</Text>
          <ArrowRight className="text-gray-400" size={24} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity className="mt-10 p-4 bg-red-500 rounded-lg items-center">
        <LogOut className="text-white" size={24} />
        <Text className="text-white font-bold">Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AccountPage;