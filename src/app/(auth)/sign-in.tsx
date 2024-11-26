import React from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  Alert, 
  Image, 
  TouchableOpacity 
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Link, router } from 'expo-router';
import { Mail, Lock, ArrowRight } from 'lucide-react-native';
import { signInSchema, SignInForm } from '@/lib/validation';
import { useAuth } from '@/lib/appwriteprovider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { OAuthProvider } from 'react-native-appwrite';
import { icons } from "@/constants";

const Login = () => {
  const { signIn,  loginWithOAuth} = useAuth();

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
            source={icons.search} 
            className="w-24 h-24 mb-4" 
            resizeMode="contain"
          />
          <Text className="text-2xl font-bold text-foreground">
            Welcome Back
          </Text>
          <Text className="text-muted-foreground">
            Sign in to continue
          </Text>
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
            <Text className="text-primary text-sm">Forgot Password?</Text>
          </TouchableOpacity>

          <Button 
            onPress={handleSubmit(onLoginPress)}
            loading={loginMutation.isPending}
            className="mt-4"
            rightIcon={<ArrowRight size={20} color="white" />}
          >
            Sign In
          </Button>

          <View className="flex-row items-center my-4">
            <View className="flex-1 h-[1px] bg-border" />
            <Text className="mx-4 text-muted-foreground">or</Text>
            <View className="flex-1 h-[1px] bg-border" />
          </View>

          <Button 
            variant="outline"
            onPress={() => googleAuthMutation.mutate()}
            loading={googleAuthMutation.isPending}
            className='py-6'
          >
            <Image 
              source={icons.google} 
              className="w-6 h-6 mr-2" 
            />
            Continue with Google
          </Button>

          <View className="flex-row justify-center mt-4">
            <Text className="text-muted-foreground">
              Don't have an account? 
            </Text>
            <Link href="/sign-up" asChild>
              <TouchableOpacity>
                <Text className="text-primary ml-1 font-bold">Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;