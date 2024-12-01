import { FavouritesSection } from "@/components/account/favourites";
import { ProfileSection } from "@/components/account/profile";
import { View } from "react-native";

const AccountScreen = () => {
    return (
      <View className="flex-1 bg-gray-100 p-4">
        <ProfileSection />
        <FavouritesSection />
        {/* <OrderHistorySection />
        <WalletSection />
        <AccountSettingsSection />
        <LogOutButton /> */}
      </View>
    );
  };

  export default AccountScreen
  