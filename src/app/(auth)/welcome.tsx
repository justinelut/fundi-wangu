import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

import CustomButton from '@/components/CustomButton';
import { onboarding } from '@/constants';

const Home = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-background">
      <TouchableOpacity
        onPress={() => {
          router.replace('/(auth)/sign-up');
        }}
        className="flex w-full items-end justify-end p-5">
        <Text className="text-md font-JakartaBold text-foreground">Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className="mx-1 h-[4px] w-[32px] rounded-full bg-[#E2E8F0]" />}
        activeDot={<View className="mx-1 h-[4px] w-[32px] rounded-full bg-primary" />}
        onIndexChanged={(index) => setActiveIndex(index)}>
        {onboarding.map((item) => (
          <View key={item.id} className="flex items-center justify-center p-5">
            <Image source={item.image} className="h-[300px] w-full" resizeMode="contain" />
            <View className="mt-10 flex w-full flex-row items-center justify-center">
              <Text className="mx-10 text-center text-3xl font-bold text-primary">{item.title}</Text>
            </View>
            <Text className="text-md font-JakartaSemiBold mx-10 mt-3 text-center text-foreground/50">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>

      <View className='px-10 w-full pb-20'>
        <TouchableOpacity
          onPress={() =>
            isLastSlide ? router.replace('/(auth)/sign-up') : swiperRef.current?.scrollBy(1)
          }
          className="mt-14 w-full flex-row items-center justify-center rounded-full bg-primary py-4 shadow-lg active:opacity-80">
         
          <Text className="text-foreground">{isLastSlide ? 'Get Started' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;
