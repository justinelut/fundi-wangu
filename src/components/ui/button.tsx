import { cn } from '@/lib/cn';
import React from 'react';
import { 
  Pressable, 
  Text, 
  ActivityIndicator, 
  GestureResponderEvent 
} from 'react-native';


export interface ButtonProps {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  variant = 'primary',
  size = 'default',
  disabled = false,
  loading = false,
  className = '',
  leftIcon,
  rightIcon,
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary text-primary-foreground';
      case 'secondary':
        return 'bg-secondary text-secondary-foreground';
      case 'destructive':
        return 'bg-destructive text-destructive-foreground';
      case 'outline':
        return 'border border-input bg-background text-foreground';
      case 'ghost':
        return 'bg-transparent text-foreground hover:bg-accent';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-9 px-3 rounded-md';
      case 'lg':
        return 'h-12 px-8 rounded-md';
      case 'icon':
        return 'h-10 w-10 p-0 rounded-full';
      default:
        return 'h-10 px-4 rounded-md';
    }
  };

  return (
    <Pressable
      onPress={!disabled && !loading ? onPress : undefined}
      className={cn(`
        flex-row 
        items-center 
        justify-center 
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${disabled ? 'opacity-50' : ''}
        ${className}
      `)}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'outline' ? '#000' : '#FFF'} 
          size="small" 
        />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          {typeof children === 'string' ? (
            <Text 
              className={cn(`
                text-base 
                font-medium 
                ${size === 'sm' ? 'text-sm' : ''}
                ${leftIcon ? 'ml-2' : ''}
                ${rightIcon ? 'mr-2' : ''}
              `)}
            >
              {children}
            </Text>
          ) : (
            children
          )}
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </Pressable>
  );
};

Button.displayName = 'Button';