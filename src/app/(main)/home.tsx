import { Stack, useLocalSearchParams } from 'expo-router';

import { Container } from '@/components/Container';
import { ScreenContent } from '@/components/ScreenContent';
import { useAuth } from '@/lib/appwriteprovider';
import { ScrollView, View } from 'react-native';
import Header from '@/components/home/header';
import SearchBar from '@/components/home/search-bar';
import Categories from '@/components/home/categories';
import BestServices from '@/components/home/best-services';
import DrawerModal from '@/components/ui/drawer';
import ReusableBottomSheet from '@/components/ui/drawer';
import BookingSlot from '@/components/booking/booking-slot';
import { useEffect, useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Details() {
  const { user } = useAuth();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const openBottomSheet = () => {
    bottomSheetRef.current?.snapToIndex(-1); // Open to the middle snap point
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close(); // Close the bottom sheet
  };

  useEffect(() => {
    openBottomSheet();
  }, []);

  return (
    <ScrollView className='h-full'>
   
    
     
        <Header />
      
        <SearchBar />
        <Categories />
        <BestServices />
       
     

      <ReusableBottomSheet>
        <BookingSlot /> {/* Pass any content here */}
      </ReusableBottomSheet>
   
    </ScrollView>
  );
}
