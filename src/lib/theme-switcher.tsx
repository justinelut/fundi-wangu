import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Sun, Moon } from "lucide-react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "./theme-provider";

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === "dark";

  const switchPosition = useSharedValue(isDarkMode ? 1 : 0);

  useEffect(() => {
    switchPosition.value = isDarkMode ? 1 : 0;
  }, [isDarkMode]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(switchPosition.value * 32, { duration: 300 }) }],
  }));

  const handleToggle = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <View className="flex-row items-center justify-between w-40 p-2 bg-card rounded-full">
      <Sun size={24} color={isDarkMode ? "gray" : "orange"} />
      <TouchableOpacity
        onPress={handleToggle}
        activeOpacity={0.8}
        className="relative w-20 h-8 bg-muted rounded-full"
      >
        <Animated.View
          style={animatedStyle}
          className="absolute w-8 h-8 bg-primary rounded-full"
        />
      </TouchableOpacity>
      <Moon size={24} color={isDarkMode ? "white" : "gray"} />
    </View>
  );
};

export default ThemeSwitcher;
