import { cn } from '@/lib/cn';
import React, { forwardRef } from 'react';
import { TextInput, View, Text } from 'react-native';

export interface InputProps extends React.ComponentProps<typeof TextInput> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: any;
  label?: string;
  iconColor?: string; // Added icon color prop for dynamic color control
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    { leftIcon, rightIcon, error, label, iconColor = 'text-gray-500', className = '', ...props },
    ref
  ) => {
    error && console.log(error);
    return (
      <View className="space-y-2">
        {label && <Text className="text-sm font-semibold">{label}</Text>}

        <View
          className={cn(
            'flex-row items-center rounded-md border p-2',
            error ? 'border-red-500' : 'border-foreground'
          )}>
          {leftIcon && (
            <View className={cn('mr-2', error ? 'text-red-500' : iconColor)}>{leftIcon}</View>
          )}

          <TextInput
            placeholderTextColor={'orange'}
            ref={ref}
            {...props}
            className={cn('flex-1 text-base text-foreground', className)}
          />

          {rightIcon && (
            <View className={cn('ml-2', error ? 'text-red-500' : iconColor)}>{rightIcon}</View>
          )}
        </View>

        {error && <Text className="mt-1 text-xs text-red-500">{error}</Text>}
      </View>
    );
  }
);
