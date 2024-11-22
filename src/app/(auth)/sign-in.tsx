import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; // Import Zod resolver
import InputField from "@/components/InputField";
import { icons, images } from "@/constants";
import { useAuth } from "@/lib/appwriteprovider"; // Adjust path if necessary

import { signInSchema, SignInForm } from "@/lib/validation"; // Import schema
import CustomButton from "@/components/CustomButton";

const SignIn = () => {
  const { signIn } = useAuth(); // Get the signIn function from context
  const { control, handleSubmit, formState: { errors }, setValue } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema), // Use the Zod schema resolver
    defaultValues: { email: "", password: "" },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form submission
  const onSignInPress = async (data: SignInForm) => {
    setIsSubmitting(true);
    try {
      await signIn(data.email, data.password); // Call the signIn function
      router.replace("/") // Redirect to home after successful sign-in
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
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Welcome 👋
          </Text>
        </View>

        <View className="p-5">
          {/* Email Input */}
          <InputField
            label="Email"
            placeholder="Enter email"
            icon={icons.email}
            textContentType="emailAddress"
            control={control}
            name="email"
            error={errors.email}
          />

          {/* Password Input */}
          <InputField
            label="Password"
            placeholder="Enter password"
            icon={icons.lock}
            secureTextEntry={true}
            textContentType="password"
            control={control}
            name="password"
            error={errors.password}
          />

          {/* Sign In Button */}
          <CustomButton
            title="Sign In"
            onPress={handleSubmit(onSignInPress)} // Submit the form
            className="mt-6"
            disabled={isSubmitting}
          />

          <Link href="/(auth)/sign-in" className="text-lg text-center text-general-200 mt-10">
            Don't have an account?{" "}
            <Text className="text-primary-500">Sign Up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
