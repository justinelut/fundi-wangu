import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, Animated } from 'react-native';
import { 
  User, 
  Settings, 
  Edit, 
  Star, 
  Briefcase, 
  MapPin, 
  Bell, 
  LogOut 
} from 'lucide-react-native';

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState('services');
  const [showSettings, setShowSettings] = useState(false);
  
  // Standard React Native animation
  const scaleValue = new Animated.Value(1);

  const handleProfilePress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.1,
        duration: 150,
        useNativeDriver: true
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true
      })
    ]).start();
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      {/* Header */}
      <View className="bg-blue-600 p-4 flex-row justify-between items-center">
        <TouchableOpacity onPress={toggleSettings}>
          <Settings color="white" size={24} />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">My Profile</Text>
        <TouchableOpacity>
          <Edit color="white" size={24} />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <Animated.View 
        style={{ 
          transform: [{ scale: scaleValue }],
          alignItems: 'center',
          padding: 24
        }}
      >
        <TouchableOpacity onPress={handleProfilePress}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/150' }}
            className="w-32 h-32 rounded-full border-4 border-blue-600"
            style={{ resizeMode: 'cover' }}
          />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-blue-600 mt-4">John Doe</Text>
        <Text className="text-gray-600 mt-2">Professional Service Provider</Text>
      </Animated.View>

      {/* Navigation Tabs */}
      <View className="flex-row justify-around border-b border-gray-200 p-2">
        <TouchableOpacity 
          onPress={() => setActiveSection('services')}
          className={`flex-row items-center p-2 ${activeSection === 'services' ? 'border-b-2 border-blue-600' : ''}`}
        >
          <Briefcase 
            color={activeSection === 'services' ? '#2563EB' : 'gray'} 
            size={20} 
          />
          <Text className={`ml-2 ${activeSection === 'services' ? 'text-blue-600' : 'text-gray-500'}`}>
            Services
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => setActiveSection('location')}
          className={`flex-row items-center p-2 ${activeSection === 'location' ? 'border-b-2 border-blue-600' : ''}`}
        >
          <MapPin 
            color={activeSection === 'location' ? '#2563EB' : 'gray'} 
            size={20} 
          />
          <Text className={`ml-2 ${activeSection === 'location' ? 'text-blue-600' : 'text-gray-500'}`}>
            Location
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content Sections */}
      <ScrollView className="p-4">
        {activeSection === 'services' && (
          <View>
            <Text className="text-xl font-bold text-blue-600 mb-4">My Services</Text>
            {[1, 2, 3].map((service) => (
              <View 
                key={service}
                className="bg-gray-100 rounded-lg p-4 mb-4 flex-row items-center"
              >
                <Star color="#EAB308" size={24} />
                <View className="ml-4">
                  <Text className="text-blue-600 font-bold">Service {service}</Text>
                  <Text className="text-gray-600">Description of service {service}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {activeSection === 'location' && (
          <View>
            <Text className="text-xl font-bold text-blue-600 mb-4">Service Areas</Text>
            <View className="bg-gray-100 rounded-lg p-4">
              <Text className="text-blue-600 font-bold">Current Location</Text>
              <Text className="text-gray-600">New York, NY</Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Settings Overlay */}
      {showSettings && (
        <View 
          className="absolute top-0 right-0 left-0 bg-white shadow-lg p-6 rounded-b-lg"
        >
          <TouchableOpacity className="flex-row items-center mb-4">
            <Bell color="#2563EB" size={24} />
            <Text className="text-blue-600 ml-4">Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center mb-4">
            <User color="#2563EB" size={24} />
            <Text className="text-blue-600 ml-4">Account Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center">
            <LogOut color="#EF4444" size={24} />
            <Text className="text-red-500 ml-4">Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProfilePage;