import React from 'react';
import { ScrollView, View, Text, Alert, Image, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Link, router } from 'expo-router';
import { Mail, Lock } from 'lucide-react-native';
import { signInSchema, SignInForm } from '@/lib/validation';
import { useAuth } from '@/lib/appwriteprovider';
import { Input } from '@/components/ui/input';
import { OAuthProvider } from 'react-native-appwrite';
import { icons } from '@/constants';

const Login = () => {
  const { signIn, loginWithOAuth } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const loginMutation = useMutation({
    mutationFn: async (data: SignInForm) => {
      console.log('x');
      console.log(data);
      console.log(errors);
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

  React.useEffect(() => {
    console.log('Form Errors:', errors);
  }, [errors]);

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <View className="p-6">
        <View className="mb-8 items-center">
          <Image source={icons.Logo} className="mb-4 h-24 w-24" resizeMode="contain" />
          <Text className="text-2xl font-bold text-foreground">Fundi Wangu</Text>
          <Text className="text-gray-500">Sign in to continue</Text>
        </View>

        <View className="flex flex-col gap-y-4 space-y-4">
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
            <Text className="text-sm text-blue-600">Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="mt-4 items-center rounded-full bg-primary py-4"
            onPress={handleSubmit(onLoginPress)}
            disabled={loginMutation.isPending}>
            <Text className="text-lg font-semibold text-white">
              {loginMutation.isPending ? 'Signing In...' : 'Sign In'}
            </Text>
          </TouchableOpacity>

          <View className="my-6 flex-row items-center">
            <View className="h-[1px] flex-1 bg-gray-300" />
            <Text className="mx-4 text-gray-500">or</Text>
            <View className="h-[1px] flex-1 bg-gray-300" />
          </View>

          <TouchableOpacity
            className="flex-row items-center justify-center rounded-full bg-secondary py-4 shadow-lg active:opacity-80"
            onPress={() => googleAuthMutation.mutate()}
            disabled={googleAuthMutation.isPending}>
            <Image source={icons.google} className="mr-2 h-6 w-6" />
            <Text className="font-medium text-foreground">
              {googleAuthMutation.isPending ? 'Signing In...' : 'Continue with Google'}
            </Text>
          </TouchableOpacity>

          <View className="mt-6 flex-row justify-center">
            <Text className="text-gray-500">Don't have an account?</Text>
            <Link href="/sign-up" asChild>
              <TouchableOpacity>
                <Text className="ml-1 font-bold text-blue-600">Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
