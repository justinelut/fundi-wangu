import { Stack, useLocalSearchParams } from 'expo-router';

import { Container } from '@/components/Container';
import { ScreenContent } from '@/components/ScreenContent';
import { useAuth } from '@/lib/appwriteprovider';
import { View } from 'react-native';
import Header from '@/components/home/header';
import SearchBar from '@/components/home/search-bar';
import Categories from '@/components/home/categories';
import BestServices from '@/components/home/best-services';

export default function Details() {
  const { user } = useAuth();

  return (
    <View className="min-h-full bg-white">
      <Stack.Screen options={{ title: 'Details' }} />
      <Container>
        <Header />
        <SearchBar />
        <Categories />
        <BestServices />
      </Container>
    </View>
  );
}
