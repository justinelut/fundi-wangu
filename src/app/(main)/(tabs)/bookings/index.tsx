import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react-native';
import { Link } from 'expo-router';
import { ActionBar, Button, Card, ColorSwatch, ExpandableSection } from 'react-native-ui-lib';
import ExpandableSectionScreen from './expander';

export default function MyBookings() {
  const primaryColor = '#f97316'; // Example: Orange (Primary)
  const secondaryColor = '#1d4ed8'; // Example: Blue (Secondary)
  const accentColor = '#22c55e'; // Example: Green (Accent)
  const foregroundColor = '#374151'; // Example: Grayish Foreground

  const shadowStyle = {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  };

  // Sample Data
  const bookings = [
    {
      id: 1,
      category: 'Carpenters',
      title: 'Living Room Cleaning',
      date: 'Mon, Oct 02, 2023 at 10:00 AM',
      status: 'COMPLETED',
      amountPaid: 190,
    },
    {
      id: 2,
      category: 'Plumbers',
      title: 'Flush Tank Repair',
      date: 'Mon, Oct 02, 2023 at 10:00 AM',
      status: 'CANCELLED',
    },
    {
      id: 3,
      category: 'Carpenters',
      title: 'Main Door Repair',
      date: 'Mon, Oct 02, 2023 at 10:00 AM',
      status: 'COMPLETED',
      amountPaid: 150,
    },
  ];

  return (
    <ScrollView className="h-full bg-gray-50 p-4">
      {/* Title */}
      <Text className="text-[${foregroundColor}] mb-6 text-3xl font-bold">My Bookings</Text>

      {/* Grouped Categories */}
      {['Carpenters', 'Plumbers'].map((category) => (
        <View key={category} className="mb-6">
          {/* Category Header */}
          <Text className="text-[${foregroundColor}] mb-3 text-lg font-semibold">{category}</Text>

          {/* Booking Cards */}
          {bookings
            .filter((item) => item.category === category)
            .map((booking) => (
              <View key={booking.id} className="mb-4 rounded-3xl bg-white p-5" style={shadowStyle}>
                {/* Status Header */}
                <View className="mb-4 flex-row items-center justify-between">
                  <View
                    className={`rounded-full px-3 py-1 ${
                      booking.status === 'COMPLETED' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                    <Text
                      className={`text-xs font-semibold ${
                        booking.status === 'COMPLETED' ? 'text-[${accentColor}]' : 'text-red-600'
                      }`}>
                      {booking.status === 'COMPLETED' ? 'JOB COMPLETED' : 'BOOKING CANCELLED'}
                    </Text>
                  </View>
                  <Link key={booking.id} href={`/bookings/${booking?.id}`}>
                    <ArrowRight size={20} color="#9ca3af" />
                  </Link>
                </View>

                {/* Booking Details */}
                <Text className="text-[${foregroundColor}] mb-1 text-lg font-semibold">
                  {booking.title}
                </Text>
                <Text className="mb-4 text-xs text-gray-500">{booking.date}</Text>

                {/* Payment and Action */}
                {booking.status === 'COMPLETED' ? (
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center space-x-1">
                      <CheckCircle size={20} color={accentColor} />
                      <Text className="text-[${foregroundColor}] text-sm">
                        Amount Paid <Text className="font-bold">${booking.amountPaid}</Text>
                      </Text>
                    </View>
                    <Pressable className={`rounded-full bg-primary px-4 py-2 shadow-md`}>
                      <Text className="text-sm font-semibold text-white">Book Again</Text>
                    </Pressable>
                  </View>
                ) : (
                  <View className="flex-row items-center space-x-2">
                    <XCircle size={20} color="#ef4444" />
                    <Text className="text-sm italic text-gray-600">Booking was cancelled</Text>
                  </View>
                )}
              </View>
            ))}
        </View>
      ))}
      {/* <View marginT-40>
        <ActionBar
          actions={[
            { label: 'Delete', onPress: () => console.log('delete') },
            { label: 'Replace Photo', onPress: () => console.log('replace photo') },
            { label: 'Edit', onPress: () => console.log('edit') },
          ]}
        />
        <Button label={'Press'} className="bg-white" backgroundColor="orange" />
      </View> */}
     
    </ScrollView>
  );
}
