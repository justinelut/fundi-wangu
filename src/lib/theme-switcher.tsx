import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { Sun, Moon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

const ThemeSwitcher: React.FC = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  // Animated value for the toggle progress
  const progress = useSharedValue(isDarkMode ? 1 : 0);

  const toggleTheme = () => {
    toggleColorScheme();
    progress.value = withTiming(isDarkMode ? 0 : 1, { duration: 300 });
  };

  // Animated styles for the slider
  const animatedSliderStyle = useAnimatedStyle(() => {
    const translateX = interpolate(progress.value, [0, 1], [0, 50], Extrapolate.CLAMP);

    // Dynamic background color based on progress
    const backgroundColor = interpolate(progress.value, [0, 0.5, 1], ['white', 'white', 'black']);

    return {
      position: 'absolute',
      width: 40,
      height: 40,
      borderRadius: 20,
      transform: [{ translateX }],
      backgroundColor,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    };
  });

  // Icon opacity calculations
  const sunOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 0.5, 1], [1, 0, 0], Extrapolate.CLAMP);

    return { opacity };
  });

  const moonOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 0.5, 1], [0, 0, 1], Extrapolate.CLAMP);

    return { opacity };
  });

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      className="relative h-[50px] w-[100px] flex-row items-center rounded-full bg-secondary p-1 dark:bg-secondary-foreground">
      {/* Background Slider */}
      <Animated.View style={animatedSliderStyle} />

      {/* Sun Icon */}
      <Animated.View style={[{ position: 'absolute', left: 10 }, sunOpacity]} className="z-10">
        <Sun size={24} color="orange" className="dark:text-primary-foreground text-primary" />
      </Animated.View>

      {/* Moon Icon */}
      <Animated.View style={[{ position: 'absolute', right: 10 }, moonOpacity]} className="z-10">
        <Moon size={24} color="gray" className="text-primary-foreground dark:text-primary" />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ThemeSwitcher;
