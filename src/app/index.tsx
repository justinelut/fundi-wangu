import { Redirect } from "expo-router";
import { useAuth } from "@/lib/appwriteprovider"; // Adjust path as necessary

const Page = () => {
  // const { isSignedIn, user, isLoading } = useAuth();

  // !isLoading  && console.log(isSignedIn)

  // Call isSignedIn() to evaluate the return value
  // if (isSignedIn) return <Redirect href="/" />;

  return <Redirect href="/(auth)/sign-in" />;
};

export default Page;
