import React, { useState } from "react";
import { ScrollView, Text, View, Alert } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/lib/appwriteprovider"; // Adjust path if necessary
import InputField from "@/components/InputField"; // Ensure correct path
import CustomButton from "@/components/CustomButton";
import { signInSchema, SignInForm } from "@/lib/validation"; // Adjust path for your schema
import { Link, router } from "expo-router";
import { icons, images } from "@/constants";

const SignIn = () => {
  const { signIn } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSignInPress = async (data: SignInForm) => {
    setIsSubmitting(true);
    try {
      await signIn(data.email, data.password);
      router.replace("/"); // Redirect to homepage
    } catch (error) {
      console.error("Sign-in failed:", error);
      Alert.alert("Error", "Sign-in failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        {/* Heading */}
        <View className="relative w-full h-[250px]">
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Welcome 👋
          </Text>
        </View>

        {/* Form */}
        <View className="p-5">
          {/* Email Input */}
          <InputField
            label="Email"
            placeholder="Enter email"
            icon={<icons.email />}
            control={control}
            name="email"
            error={errors.email?.message} // Pass error from formState
          />

          {/* Password Input */}
          <InputField
            label="Password"
            placeholder="Enter password"
            icon={<icons.lock />}
            secureTextEntry={true}
            control={control}
            name="password"
            error={errors.password?.message} // Pass error from formState
          />

          {/* Sign In Button */}
          <CustomButton
            title="Sign In"
            onPress={handleSubmit(onSignInPress)} // Ensure handleSubmit is connected to button press
            disabled={isSubmitting}
          />

          {/* Link to Sign Up */}
          <Link href="/(auth)/sign-up" className="text-lg text-center text-orange-500 mt-10">
            Don't have an account?{" "}
            <Text className="text-primary-500">Sign Up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
