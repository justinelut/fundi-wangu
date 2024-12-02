import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Link, router } from 'expo-router';
import { Mail, Lock, User, EyeOff, Eye } from 'lucide-react-native';

import { signUpSchema, SignUpForm } from '@/lib/validation';
import { useAuth } from '@/lib/appwriteprovider';
import { Input } from '@/components/ui/input';
import { icons } from '@/constants';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, loginWithOAuth } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const signupMutation = useMutation<void, Error, SignUpForm>({
    mutationFn: async (data) => {
      await signUp(data.email, data.password, data.name);
    },
    onSuccess: () => {
      Alert.alert('Success', 'Account created successfully! Please verify your email.', [
        { text: 'Login', onPress: () => router.replace('/sign-in') },
      ]);
    },
    onError: (error) => {
      Alert.alert('Error', error.message || 'Signup failed');
    },
  });

  const googleAuthMutation = useMutation<void, Error>({
    mutationFn: async () => {
      await loginWithOAuth('google');
    },
    onError: (error) => {
      Alert.alert('Error', error.message || 'Google signup failed');
    },
  });

  const onSignupPress = (data: SignUpForm) => signupMutation.mutate(data);

  return (
    <ScrollView className="flex-1 bg-background px-6">
      <View className="flex-1 justify-center">
        {/* Logo */}
        <View className="items-center mt-12">
          <Image source={icons.Logo} className="w-24 h-24" />
        </View>

        {/* Header */}
        <View className="mt-8">
          <Text className="text-3xl font-bold text-foreground text-center">Create Account</Text>
          <Text className="text-muted-foreground text-center mt-2">
            Let's get you started in a few steps!
          </Text>
        </View>

        {/* Input Fields */}
        <View className="mt-10 space-y-6 flex flex-col gap-y-4">
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Full Name"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                leftIcon={<User size={20} color="#9CA3AF" />}
                error={errors.name?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Email Address"
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
                placeholder="Password"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                leftIcon={<Lock size={20} color="#9CA3AF" />}
                rightIcon={
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeOff size={20} color="#9CA3AF" />
                    ) : (
                      <Eye size={20} color="#9CA3AF" />
                    )}
                  </TouchableOpacity>
                }
                error={errors.password?.message}
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Confirm Password"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                leftIcon={<Lock size={20} color="#9CA3AF" />}
                error={errors.confirmPassword?.message}
              />
            )}
          />
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          onPress={handleSubmit(onSignupPress)}
          className="mt-8 bg-primary py-4 rounded-full shadow-lg active:opacity-80"
        >
          <Text className="text-center text-white font-semibold text-lg">Sign Up</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center my-8">
          <View className="flex-1 h-[1px] bg-muted-foreground" />
          <Text className="px-4 text-muted-foreground text-sm">or</Text>
          <View className="flex-1 h-[1px] bg-muted-foreground" />
        </View>

        {/* Social Signup */}
        <TouchableOpacity
          onPress={() => googleAuthMutation.mutate()}
          className="flex-row items-center justify-center bg-secondary py-4 rounded-full shadow-lg active:opacity-80"
        >
          <Image source={icons.google} className="w-6 h-6 mr-3" />
          <Text className="text-foreground font-semibold text-lg">Continue with Google</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View className="flex-row justify-center mt-6">
          <Text className="text-muted-foreground">Already have an account?</Text>
          <Link href="/sign-in" asChild>
            <TouchableOpacity>
              <Text className="text-primary font-bold ml-1">Sign In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup;
