import { Redirect } from "expo-router";
import { useAuth } from "@/lib/appwriteprovider"; // Adjust path as necessary

const Page = () => {
  const { isSignedIn } = useAuth();

  // Call isSignedIn() to evaluate the return value
  if (isSignedIn()) return <Redirect href="/(root)/(tabs)/home" />;

  return <Redirect href="/(auth)/sign-in" />;
};

export default Page;
