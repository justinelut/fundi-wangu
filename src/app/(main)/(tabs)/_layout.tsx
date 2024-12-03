import { Tabs } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Home, LayoutGrid, NotepadText, MessageCircle, User, List } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';

const TabIcon = ({
  Icon,
  focused,
  label,
}: {
  Icon: React.ComponentType<any>;
  focused: boolean;
  label: string;
}) => (
  <View className="items-center ">
    <View
      className={`items-center justify-center rounded-full px-4 py-2 ${
        focused ? 'bg-orange-100' : 'bg-transparent'
      }`}>
      <Icon size={24} color={focused ? '#f97316' : '#9ca3af'} />
    </View>
    <Text
      className={`mt-1 w-full text-xs ${
        focused ? 'font-medium text-orange-500' : 'text-gray-500'
      }`}>
      {label}
    </Text>
  </View>
);

export default function Layout() {
  const { colorScheme } = useColorScheme();

  // Determine background color based on color scheme
  const backgroundColor = colorScheme === 'dark' ? '#000000' : '#ffffff';
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor,
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.1,
          shadowRadius: 4,

          height: 70,
          flexDirection: 'row', // Ensure tabs are laid out horizontally
          alignItems: 'center', // Vertically center the icons
          justifyContent: 'space-evenly', // Evenly space out the tabs
        },
        tabBarButton: (props) => (
          <Pressable
            {...props}
            className="flex items-center"
            android_ripple={null} // Disable the ripple effect on Android
            style={({ pressed }) => [
              { flex: 1, justifyContent: 'center', alignItems: 'center' },
              pressed && { opacity: 1 }, // Simulates WhatsApp's click effect without a background
            ]}
          />
        ),
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon Icon={Home} focused={focused} label="Home" />,
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categories',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon Icon={LayoutGrid} focused={focused} label="Categories" />
          ),
        }}
      />
      <Tabs.Screen
        name="listings"
        options={{
          title: 'Listings',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon Icon={List} focused={focused} label="Listings" />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: 'Bookings',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon Icon={NotepadText} focused={focused} label="Bookings" />
          ),
        }}
      />
     
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon Icon={User} focused={focused} label="Account" />,
        }}
      />
    </Tabs>
  );
}
