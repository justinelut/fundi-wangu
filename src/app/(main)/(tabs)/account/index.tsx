import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import {
  User,
  Mail,
  CreditCard,
  Bell,
  PaintBucket,
  HelpCircle,
  Gift,
  Lock,
  Info,
  ChevronRight,
  LogOut,
  Edit,
  Phone,
  Calendar,
  Heart,
  DollarSign,
  MessageSquare,
  Users,
  Ticket,
} from 'lucide-react-native';

const SettingItem = ({ icon, title, onPress }) => (
  <TouchableOpacity
    className="mb-2 flex-row items-center rounded-lg bg-white p-4 shadow-sm"
    onPress={onPress}>
    <View className="mr-4 rounded-full bg-primary/10 p-2">{icon}</View>
    <Text className="flex-1 text-base font-medium text-gray-800">{title}</Text>
    <ChevronRight size={20} color="#9CA3AF" />
  </TouchableOpacity>
);

const SettingCategory = ({ title, icon, children }) => {
  const [expanded, setExpanded] = useState(false);
  const heightValue = useSharedValue(0);
  const opacityValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    height: withTiming(heightValue.value, { duration: 300 }),
    opacity: withTiming(opacityValue.value, { duration: 300 }),
  }));

  const toggleExpanded = () => {
    setExpanded(!expanded);
    heightValue.value = expanded ? 0 : 200; // Adjust based on content
    opacityValue.value = expanded ? 0 : 1;
  };

  return (
    <View className="mb-6">
      <TouchableOpacity className="mb-2 flex-row items-center" onPress={toggleExpanded}>
        <View className="mr-3 rounded-full bg-primary/20 p-2">{icon}</View>
        <Text className="flex-1 text-lg font-bold text-primary">{title}</Text>
        <ChevronRight
          size={24}
          color="#4B5563"
          style={{ transform: [{ rotate: expanded ? '90deg' : '0deg' }] }}
        />
      </TouchableOpacity>
      <Animated.View style={animatedStyle} className="mb-1 mt-1 overflow-hidden">
        {children}
      </Animated.View>
    </View>
  );
};

const ProfileScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const profileScale = useSharedValue(1);

  const profileStyle = useAnimatedStyle(() => ({
    transform: [{ scale: profileScale.value }],
  }));

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <LinearGradient
        colors={['#FFA726', '#FB8C00', '#F57C00']}
        className="h-48 justify-end px-4 pb-4">
        <Animated.View
          className="flex-row items-end"
          onTouchStart={() => (profileScale.value = withTiming(1.1))}
          onTouchEnd={() => (profileScale.value = withTiming(1))}>
          <Animated.Image
            source={{ uri: 'https://i.pravatar.cc/150?img=32' }}
            className="h-24 w-24 rounded-full border-4 border-white"
            style={profileStyle}
          />
          <View className="mb-2 ml-4">
            <Text className="text-2xl font-bold text-white">Jane Doe</Text>
            <Text className="text-white opacity-80">@jane_doe</Text>
          </View>
        </Animated.View>
      </LinearGradient>

      <View className="px-4 pt-6">
        {/* Profile Information */}
        <SettingCategory title="Profile Information" icon={<User size={24} color="#F57C00" />}>
          <SettingItem icon={<Edit size={20} color="#F57C00" />} title="Edit Profile" />
          <SettingItem icon={<Phone size={20} color="#F57C00" />} title="Update Contact Info" />
        </SettingCategory>

        {/* Account Management */}
        <SettingCategory title="Account Management" icon={<CreditCard size={24} color="#F57C00" />}>
          <SettingItem icon={<Calendar size={20} color="#F57C00" />} title="My Bookings" />
          <SettingItem icon={<Heart size={20} color="#F57C00" />} title="My Favorites" />
          <SettingItem
            icon={<DollarSign size={20} color="#F57C00" />}
            title="Transaction History"
          />
        </SettingCategory>

        {/* Payments */}
        <SettingCategory title="Payments" icon={<CreditCard size={24} color="#F57C00" />}>
          <SettingItem
            icon={<CreditCard size={20} color="#F57C00" />}
            title="Manage Payment Methods"
          />
          <SettingItem
            icon={<DollarSign size={20} color="#F57C00" />}
            title="Transaction History"
          />
        </SettingCategory>

        {/* Notifications */}
        <SettingCategory title="Notifications" icon={<Bell size={24} color="#F57C00" />}>
          <SettingItem icon={<Mail size={20} color="#F57C00" />} title="Email" />
          <SettingItem icon={<MessageSquare size={20} color="#F57C00" />} title="SMS" />
          <SettingItem icon={<Bell size={20} color="#F57C00" />} title="In-App Settings" />
        </SettingCategory>

        {/* Appearance */}
        <SettingCategory title="Appearance" icon={<PaintBucket size={24} color="#F57C00" />}>
          <View className="flex-row items-center justify-between rounded-lg bg-white p-4">
            <Text className="text-base font-medium text-gray-800">Dark Mode</Text>
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              trackColor={{ false: '#FFE0B2', true: '#FB8C00' }}
              thumbColor={isDarkMode ? '#F57C00' : '#FFE0B2'}
            />
          </View>
        </SettingCategory>

        {/* Help */}
        <SettingCategory title="Help" icon={<HelpCircle size={24} color="#F57C00" />}>
          <SettingItem icon={<HelpCircle size={20} color="#F57C00" />} title="FAQs" />
          <SettingItem icon={<MessageSquare size={20} color="#F57C00" />} title="Contact Support" />
          <SettingItem icon={<Info size={20} color="#F57C00" />} title="Report an Issue" />
        </SettingCategory>

        {/* Promotions */}
        <SettingCategory title="Promotions" icon={<Gift size={24} color="#F57C00" />}>
          <SettingItem icon={<Users size={20} color="#F57C00" />} title="Invite Friends" />
          <SettingItem icon={<Ticket size={20} color="#F57C00" />} title="Promo Codes" />
        </SettingCategory>

        {/* Privacy & Security */}
        <SettingCategory title="Privacy & Security" icon={<Lock size={24} color="#F57C00" />}>
          <SettingItem icon={<Lock size={20} color="#F57C00" />} title="Change Password" />
          <SettingItem icon={<Lock size={20} color="#F57C00" />} title="Privacy Settings" />
        </SettingCategory>

        {/* General */}
        <SettingCategory title="General" icon={<Info size={24} color="#F57C00" />}>
          <SettingItem icon={<Info size={20} color="#F57C00" />} title="About App" />
          <SettingItem icon={<Info size={20} color="#F57C00" />} title="Terms & Privacy Policy" />
        </SettingCategory>

        {/* Logout */}
        <TouchableOpacity className="mb-8 mt-6 flex-row items-center justify-center rounded-lg bg-primary p-4">
          <LogOut size={24} color="#FFFFFF" />
          <Text className="ml-2 text-lg font-bold text-white">Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
