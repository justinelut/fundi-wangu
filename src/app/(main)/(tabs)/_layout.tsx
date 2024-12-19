import { Tabs } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { Home, LayoutGrid, NotepadText, User, List } from 'lucide-react-native';
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
      className={`items-center justify-center rounded-full px-4 py-1 ${
        focused ? 'bg-orange-200' : 'bg-transparent'
      }`}>
      <Icon fill={focused ? '#f97316' : '#fff'} size={24} color={focused ? '#f97316' : '#9ca3af'} />
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
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        },
        tabBarButton: (props) => (
          <Pressable
            {...props}
            className="flex items-center"
            android_ripple={null}
            style={({ pressed }) => [
              { flex: 1, justifyContent: 'center', alignItems: 'center' },
              pressed && { opacity: 1 },
            ]}
          />
        ),
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: true, // Display header for Home tab
          headerStyle: { backgroundColor: backgroundColor },
          headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
          tabBarIcon: ({ focused }) => <TabIcon Icon={Home} focused={focused} label="Home" />,
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categories',
          headerShown: true, // Display header for Categories tab
          headerStyle: { backgroundColor: backgroundColor },
          headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
          tabBarIcon: ({ focused }) => (
            <TabIcon Icon={LayoutGrid} focused={focused} label="Categories" />
          ),
        }}
      />
      <Tabs.Screen
        name="listings"
        options={{
          title: 'Listings',
          headerShown: true, // Display header for Listings tab
          headerStyle: { backgroundColor: backgroundColor },
          headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
          tabBarIcon: ({ focused }) => (
            <TabIcon Icon={List} focused={focused} label="Listings" />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: 'Bookings',
          headerShown: true, // Display header for Bookings tab
          headerStyle: { backgroundColor: backgroundColor },
          headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
          tabBarIcon: ({ focused }) => (
            <TabIcon Icon={NotepadText} focused={focused} label="Bookings" />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          headerShown: true, // Display header for Account tab
          headerStyle: { backgroundColor: backgroundColor },
          headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
          tabBarIcon: ({ focused }) => <TabIcon Icon={User} focused={focused} label="Account" />,
        }}
      />
    </Tabs>
  );
}
