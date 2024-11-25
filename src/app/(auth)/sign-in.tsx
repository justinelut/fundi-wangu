import React from 'react';
import { ScrollView, View, Text, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Link, router } from 'expo-router';
import { Mail, Lock } from 'lucide-react-native';
import { signInSchema, SignInForm } from '@/lib/validation';
import { useAuth } from '@/lib/appwriteprovider';
import { Input } from '@/components/ui/input';

const Login = () => {
  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: SignInForm) => {
      await signIn(data.email, data.password);
    },
    onSuccess: () => {
      Alert.alert('Success', 'You have successfully logged in!');
      router.replace('/');
    },
    onError: (error: Error) => {
      Alert.alert('Error', error.message || 'Login failed. Please try again.');
    },
  });

  const onLoginPress = (data: SignInForm) => {
    mutation.mutate(data);
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-5">
        <Text className="mb-4 text-xl font-bold text-center text-foreground">
          Log In
        </Text>

        <View className="space-y-4">
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Enter your email"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
                leftIcon={<Mail size={20} color="#9CA3AF" />}
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Enter your password"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                secureTextEntry
                autoCapitalize="none"
                leftIcon={<Lock size={20} color="#9CA3AF" />}
                error={errors.password?.message}
              />
            )}
          />
        </View>

        {/* We'll create a Button component next */}
      </View>
    </ScrollView>
  );
};

export default Login;