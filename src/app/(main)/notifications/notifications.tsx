import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Bell, Trash2, MessageSquare, CreditCard } from 'lucide-react-native';

const notifications = [
  {
    id: 1,
    title: 'New Booking Confirmed',
    description: 'Your service has been booked successfully.',
    time: '2h ago',
    icon: <Bell size={24} color="#3B82F6" />, // Lucide Bell icon
  },
  {
    id: 2,
    title: 'Payment Received',
    description: 'You have received a payment of $250.',
    time: '4h ago',
    icon: <CreditCard size={24} color="#10B981" />, // Lucide Credit Card icon
  },
  {
    id: 3,
    title: 'New Message',
    description: 'You have a new message from John Doe.',
    time: '1d ago',
    icon: <MessageSquare size={24} color="#F59E0B" />, // Lucide MessageSquare icon
  },
];

const NotificationItem = ({ item }) => (
  <View className="mb-4 flex-row items-center rounded-lg bg-gray-50 p-4 shadow-sm">
    {/* Notification Icon */}
    <View className="rounded-full bg-gray-100 p-3">{item.icon}</View>

    {/* Notification Details */}
    <View className="ml-4 flex-1">
      <Text className="text-base font-semibold text-gray-900">{item.title}</Text>
      <Text className="text-sm text-gray-600">{item.description}</Text>
      <Text className="mt-1 text-xs text-gray-400">{item.time}</Text>
    </View>

    {/* Action Buttons */}
    <TouchableOpacity className="ml-4">
      <Trash2 size={20} color="#EF4444" />
    </TouchableOpacity>
  </View>
);

const NotificationScreen = () => {
  return (
    <ScrollView className="h-full">
      <View className="flex-1 bg-white p-4">
        {/* Header */}
        <View className="mb-6 flex-row items-center justify-between">
          <Text className="text-xl font-bold text-gray-900">Notifications</Text>
          <TouchableOpacity className="rounded-lg bg-blue-500 px-4 py-2">
            <Text className="font-semibold text-white">Clear All</Text>
          </TouchableOpacity>
        </View>

        {/* Notification List */}
        <ScrollView showsVerticalScrollIndicator={false}>
          {notifications.map((notification) => (
            <NotificationItem key={notification.id} item={notification} />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default NotificationScreen;
