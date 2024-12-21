import { cn } from '@/lib/cn';
import React, { forwardRef } from 'react';
import { Controller, Control } from 'react-hook-form';
import { TextInput, View, Text } from 'react-native';

export interface InputProps
  extends Omit<React.ComponentProps<typeof TextInput>, 'value' | 'onChangeText'> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
  label?: string;
  iconColor?: string;
  control: Control<any>;
  name: string;
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      leftIcon,
      rightIcon,
      error,
      label,
      iconColor = 'text-gray-500',
      className = '',
      control,
      name,
      ...props
    },
    ref
  ) => {
    return (
      <View className="space-y-2">
        {label && <Text className="mb-2 text-lg font-medium text-foreground">{label}</Text>}

        <View
          className={cn(
            'flex-row items-center rounded-md border p-2',
            error ? 'border-red-500' : 'border-foreground'
          )}>
          {leftIcon && (
            <View className={cn('mr-2', error ? 'text-red-500' : iconColor)}>{leftIcon}</View>
          )}

          <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
              <TextInput
                ref={ref}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                {...props}
                className={cn(
                  `${error ? 'border-destructive' : ''} place flex-1 text-base text-foreground`,
                  className
                )}
              />
            )}
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
