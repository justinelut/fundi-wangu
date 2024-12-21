import { Stack, useLocalSearchParams } from 'expo-router';

import { Container } from '@/components/Container';
import { ScreenContent } from '@/components/ScreenContent';
import { useAuth } from '@/lib/appwriteprovider';
import { FlatList, ScrollView, View } from 'react-native';
import Header from '@/components/home/header';
import SearchBar from '@/components/home/search-bar';
import Categories from '@/components/home/categories';
import BestServices from '@/components/home/best-services';
import BookingSlot from '@/components/booking/booking-slot';
import { useEffect, useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FeaturedServices from '@/components/home/featured-services';
import ThemeSwitcher from '@/lib/theme-switcher';
import LogoutScreen from '@/components/auth/logout';
import { services } from '@/components/home/home-screen-data';
import { ServiceItem } from '@/components/home/service-item';

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
    // <ScrollView className="h-full" showsVerticalScrollIndicator={false}>

    //   <LogoutScreen />
    //   {/* <SearchBar /> */}
    //   <ThemeSwitcher />

    //   <BestServices />
    //   <ReusableBottomSheet>
    //     <BookingSlot /> {/* Pass any content here */}
    //   </ReusableBottomSheet>
    // </ScrollView>
    <FlatList
      data={services}
      renderItem={({ item }) => <ServiceItem item={item} />}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2} // Two items per row
      bounces={false}
      columnWrapperClassName="flex mx-1"
      contentContainerClassName="w-full"
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => (
        <View>
          <Header />
          <Categories />
          <FeaturedServices />
        </View>
      )}
    />
  );
}
