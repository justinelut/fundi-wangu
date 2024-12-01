import { cn } from '@/lib/cn';
import React from 'react';
import { View, ViewProps, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenWrapperProps extends ViewProps {
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  fullBackground?: boolean;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  className = '',
  edges = ['top', 'bottom'],
  fullBackground = true,
  style,
  ...props
}) => {
  return (
    <View
      style={[
        {
          flex: 1, // Ensures the container takes up the full screen
          // backgroundColor: 'hsl(0, 0%, 100%)', // Light background by default
        },
        style,
      ]}
      className={cn('bg-background', className)}
      {...props}
    >
      <SafeAreaView 
        edges={edges} 
        className={cn('flex-1 bg-background')}
      
      >
        {children}
      </SafeAreaView>
    </View>
  );
};
