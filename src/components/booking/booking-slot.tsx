import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { format, addDays } from 'date-fns';

const BookingSlot = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('11:00 AM');

  const dates = [...Array(5)].map((_, index) => {
    const date = addDays(new Date(), index);
    return {
      day: format(date, 'EEE'),
      date: format(date, 'dd'),
      full: date,
    };
  });

  const timeSlots = [
    '10:00 AM',
    '11:00 AM',
    '12:30 PM',
    '01:30 PM',
    '03:00 PM',
    '04:30 PM',
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4">
        {/* Date Selection */}
        <Text className="text-xl font-bold mb-4">Select Date</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="mb-6"
        >
          {dates.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedDate(item.full)}
              className={`mr-3 w-16 h-16 rounded-lg justify-center items-center border ${
                format(selectedDate, 'dd') === item.date
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200'
              }`}
            >
              <Text className={`text-sm ${
                format(selectedDate, 'dd') === item.date
                  ? 'text-blue-500'
                  : 'text-gray-600'
              }`}>
                {item.day}
              </Text>
              <Text className={`text-lg font-semibold ${
                format(selectedDate, 'dd') === item.date
                  ? 'text-blue-500'
                  : 'text-black'
              }`}>
                {item.date}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Time Selection */}
        <Text className="text-xl font-bold mb-4">Select Time</Text>
        <View className="flex-row flex-wrap justify-between">
          {timeSlots.map((time, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedTime(time)}
              className={`mb-4 px-4 py-2 rounded-lg border ${
                selectedTime === time
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200'
              }`}
            >
              <Text className={
                selectedTime === time
                  ? 'text-blue-500'
                  : 'text-gray-600'
              }>
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Bottom Button */}
      <View className="absolute bottom-8 left-4 right-4">
        <TouchableOpacity 
          className="bg-blue-500 py-4 rounded-lg"
          onPress={() => {
            // Handle checkout
          }}
        >
          <Text className="text-white text-center font-semibold">
            Proceed to Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BookingSlot;

