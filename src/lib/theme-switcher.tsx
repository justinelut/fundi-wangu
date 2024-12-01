import React from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { Sun, Moon } from 'lucide-react-native';
import { useTheme } from './theme-provider';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";

  // Animated value for the toggle progress
  const progress = useSharedValue(isDarkMode ? 1 : 0);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setTheme(newTheme);
    progress.value = withTiming(newTheme === "dark" ? 1 : 0, { duration: 300 });
  };

  // Animated styles for the icon and background
  const animatedContainerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolate(
      progress.value,
      [0, 1],
      ['#FFFFFF', '#000000'],
      Extrapolate.CLAMP
    );

    return {
      backgroundColor, // This controls the background color based on theme
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: 100,
      height: 50,
      borderRadius: 25,
      padding: 10,
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      progress.value,
      [0, 1],
      [0, 40],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateX }],
      position: 'absolute',
      flexDirection: 'row',
    };
  });

  const sunOpacity = interpolate(
    progress.value,
    [0, 0.5, 1],
    [1, 0, 0],
    Extrapolate.CLAMP
  );

  const moonOpacity = interpolate(
    progress.value,
    [0, 0.5, 1],
    [0, 0, 1],
    Extrapolate.CLAMP
  );

  return (
    <TouchableOpacity onPress={toggleTheme}>
      <Animated.View style={animatedContainerStyle}>
        <Animated.View style={[animatedIconStyle, { opacity: sunOpacity }]}>
          <Sun size={24} color={isDarkMode ? "gray" : "orange"} />
        </Animated.View>
        <Animated.View style={[animatedIconStyle, { opacity: moonOpacity }]}>
          <Moon size={24} color={isDarkMode ? "white" : "gray"} />
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ThemeSwitcher;
