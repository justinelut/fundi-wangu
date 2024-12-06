import { Redirect } from "expo-router";
import { useAuth } from "@/lib/appwriteprovider"; // Adjust path as necessary

const Page = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) return <Redirect href="/(main)/home" />;

  return <Redirect href="/(auth)/welcome" />;
};

export default Page;
