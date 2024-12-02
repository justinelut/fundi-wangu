import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Link, router } from 'expo-router';
import { Mail, Lock } from 'lucide-react-native';
import { signInSchema, SignInForm } from '@/lib/validation';
import { useAuth } from '@/lib/appwriteprovider';
import { Input } from '@/components/ui/input';
import { OAuthProvider } from 'react-native-appwrite';
import { icons } from "@/constants";

const Login = () => {
  const { signIn, loginWithOAuth } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
  });

  const loginMutation = useMutation({
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

  const googleAuthMutation = useMutation<void, Error>({
    mutationFn: async () => {
      await loginWithOAuth(OAuthProvider.Google);
    },
    onSuccess: () => {
      router.replace('/');
    },
    onError: (error: Error) => {
      Alert.alert('Error', error.message || 'Google login failed');
    },
  });

  const onLoginPress = (data: SignInForm) => {
    loginMutation.mutate(data);
  };

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
    >
      <View className="p-6">
        <View className="items-center mb-8">
          <Image
            source={icons.Logo}
            className="w-24 h-24 mb-4"
            resizeMode="contain"
          />
          <Text className="text-2xl font-bold text-foreground">
            Fundi Wangu
          </Text>
          <Text className="text-gray-500">Sign in to continue</Text>
        </View>

        <View className="space-y-4 flex flex-col gap-y-4">
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

          <TouchableOpacity className="self-end">
            <Text className="text-blue-600 text-sm">Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-primary rounded-full py-4 items-center mt-4"
            onPress={handleSubmit(onLoginPress)}
            disabled={loginMutation.isPending}
          >
            <Text className="text-white text-lg font-semibold">
              {loginMutation.isPending ? 'Signing In...' : 'Sign In'}
            </Text>
          </TouchableOpacity>

          <View className="flex-row items-center my-6">
            <View className="flex-1 h-[1px] bg-gray-300" />
            <Text className="mx-4 text-gray-500">or</Text>
            <View className="flex-1 h-[1px] bg-gray-300" />
          </View>

          <TouchableOpacity
            className="bg-white border border-gray-300 rounded-full py-4 flex-row justify-center items-center"
            onPress={() => googleAuthMutation.mutate()}
            disabled={googleAuthMutation.isPending}
          >
            <Image source={icons.google} className="w-6 h-6 mr-2" />
            <Text className="text-gray-700 font-medium">
              {googleAuthMutation.isPending
                ? 'Signing In...'
                : 'Continue with Google'}
            </Text>
          </TouchableOpacity>

          <View className="flex-row justify-center mt-6">
            <Text className="text-gray-500">Don't have an account?</Text>
            <Link href="/sign-up" asChild>
              <TouchableOpacity>
                <Text className="text-blue-600 ml-1 font-bold">Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
