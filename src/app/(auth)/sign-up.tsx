import React, { useState } from 'react';
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
import { 
  Mail, 
  Lock, 
  User, 
  EyeOff, 
  Eye, 
  ArrowRight 
} from 'lucide-react-native';

import { signUpSchema, SignUpForm } from '@/lib/validation';
import { useAuth } from '@/lib/appwriteprovider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { icons } from "@/constants";
import { OAuthProvider } from 'react-native-appwrite';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, loginWithOAuth } = useAuth();

  const {
    control,
    handleSubmit,
    watch,
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
      await signUp(
        data.email,
        data.password,
        data.name,
      );
    },
    onSuccess: () => {
      Alert.alert(
        'Success', 
        'Account created successfully! Please verify your email.',
        [{ text: 'Login', onPress: () => router.replace('/sign-in') }]
      );
    },
    onError: (error: Error) => {
      Alert.alert('Error', error.message || 'Signup failed');
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
      Alert.alert('Error', error.message || 'Google signup failed');
    },
  });

  const onSignupPress = (data: SignUpForm) => {
    signupMutation.mutate(data);
  };

  const passwordStrengthColor = () => {
    const password = watch('password');
    if (!password) return 'bg-border';
    if (password.length < 8) return 'bg-destructive';
    if (password.length < 12) return 'bg-accent';
    return 'bg-success';
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
            Create Account
          </Text>
          <Text className="text-muted-foreground">
            Join our community
          </Text>
        </View>

        <View className="space-y-4 flex flex-col gap-y-4">
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

          <View className="h-1 w-full flex-row space-y-4">
            <View className={`flex-1 h-1 mr-1 ${passwordStrengthColor()}`} />
            <View className={`flex-1 h-1 mr-1 ${
              watch('password')?.length > 8 
                ? passwordStrengthColor() 
                : 'bg-border'
            }`} />
            <View className={`flex-1 h-1 ${
              watch('password')?.length > 12 
                ? passwordStrengthColor() 
                : 'bg-border'
            }`} />
          </View>

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

          <Button 
            onPress={handleSubmit(onSignupPress)}
            loading={signupMutation.isPending}
            className="mt-4"
            rightIcon={<ArrowRight size={20} color="white" />}
          >
            Create Account
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
            className='py-8'
          >
            <Image 
              source={icons.google} 
              className="w-6 h-6 mr-2" 
            />
            Continue with Google
          </Button>

          <View className="flex-row justify-center mt-4">
            <Text className="text-muted-foreground">
              Already have an account? 
            </Text>
            <Link href="/sign-in" asChild>
              <TouchableOpacity>
                <Text className="text-primary ml-1 font-bold">Sign In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup;