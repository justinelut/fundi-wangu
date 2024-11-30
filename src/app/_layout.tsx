import { AuthProvider } from '@/lib/appwriteprovider';
import '@/global.css';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import QueryProvider from '@/lib/query-client-provider';
import { ThemeProvider } from '@/lib/theme-provider';
import { ScreenWrapper } from '@/components/screen-wrapper';
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [loaded] = useFonts({
    'Jakarta-Bold': require('@/assets/fonts/PlusJakartaSans-Bold.ttf'),
    'Jakarta-ExtraBold': require('@/assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
    'Jakarta-ExtraLight': require('@/assets/fonts/PlusJakartaSans-ExtraLight.ttf'),
    'Jakarta-Light': require('@/assets/fonts/PlusJakartaSans-Light.ttf'),
    'Jakarta-Medium': require('@/assets/fonts/PlusJakartaSans-Medium.ttf'),
    Jakarta: require('@/assets/fonts/PlusJakartaSans-Regular.ttf'),
    'Jakarta-SemiBold': require('@/assets/fonts/PlusJakartaSans-SemiBold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
   
      <QueryProvider>
        <ThemeProvider>
          <AuthProvider>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="(main)" options={{ headerShown: false }} />
              <Stack.Screen name="(search)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </AuthProvider>
        </ThemeProvider>
      </QueryProvider>
    
  );
}
