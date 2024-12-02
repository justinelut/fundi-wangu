import { cn } from '@/lib/cn';
import React, { forwardRef } from 'react';
import { TextInput, View, Text } from 'react-native';

export interface InputProps extends React.ComponentProps<typeof TextInput> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  label?: string;
  iconColor?: string; // Added icon color prop for dynamic color control
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    { leftIcon, rightIcon, error, label, iconColor = 'text-gray-500', className = '', ...props },
    ref
  ) => {
    return (
      <View className="space-y-2">
        {label && <Text className="text-sm font-semibold">{label}</Text>}

        <View className="flex-row items-center rounded-md border border-foreground p-2">
          {leftIcon && (
            <View className={cn(`mr-2 ${error && 'text-red-500'}`, iconColor)}>{leftIcon}</View> // Applying dynamic icon color
          )}

          <TextInput
           placeholderTextColor={"orange"}
            ref={ref}
            {...props}
            className={cn(`flex-1 text-base text-foreground ${error && 'border-red-500'}`, className)} // Dynamically applying Tailwind classes
          />

          {rightIcon && (
            <View className={cn(`ml-2 ${error && 'text-red-500'}`, iconColor)}>{rightIcon}</View> // Applying dynamic icon color
          )}
        </View>

        {error && <Text className="mt-1 text-xs text-red-500">{error}</Text>}
      </View>
    );
  }
);

Input.displayName = 'Input';
