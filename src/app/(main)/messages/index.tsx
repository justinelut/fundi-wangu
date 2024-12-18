import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Link } from 'expo-router';

type User = {
  id: string;
  name: string;
  avatar: string;
};

type Message = {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  timestamp: string;
  isSent: boolean;
};



export const users: User[] = [
  { id: '1', name: 'Alice Johnson', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', name: 'Bob Smith', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: '3', name: 'Charlie Brown', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: '4', name: 'Diana Prince', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: '5', name: 'Ethan Hunt', avatar: 'https://i.pravatar.cc/150?img=5' },
];

export const messages: Message[] = [
  {
    id: '1',
    chatId: '1',
    userId: '1',
    text: 'Hey, how are you doing?',
    timestamp: '10:30 AM',
    isSent: false,
  },
  {
    id: '2',
    chatId: '1',
    userId: 'me',
    text: 'I’m good, thanks! How about you?',
    timestamp: '10:31 AM',
    isSent: true,
  },
  {
    id: '3',
    chatId: '1',
    userId: '1',
    text: 'Doing well too. Any plans for the weekend?',
    timestamp: '10:32 AM',
    isSent: false,
  },
  {
    id: '4',
    chatId: '1',
    userId: 'me',
    text: 'Not yet, maybe catch a movie. You?',
    timestamp: '10:33 AM',
    isSent: true,
  },
  {
    id: '5',
    chatId: '1',
    userId: '1',
    text: 'Sounds good! I might go hiking.',
    timestamp: '10:34 AM',
    isSent: false,
  },
];

export const chats = [
  {
    id: '1',
    userId: '1',
    lastMessage: 'Hey, how are you doing?',
    timestamp: '10:30 AM',
    unreadCount: 2,
  },
  {
    id: '2',
    userId: '2',
    lastMessage: 'Can we meet tomorrow?',
    timestamp: 'Yesterday',
    unreadCount: 0,
  },
  {
    id: '3',
    userId: '3',
    lastMessage: 'I sent you the files.',
    timestamp: 'Tuesday',
    unreadCount: 1,
  },
  {
    id: '4',
    userId: '4',
    lastMessage: 'Thanks for your help!',
    timestamp: 'Monday',
    unreadCount: 0,
  },
  {
    id: '5',
    userId: '5',
    lastMessage: 'See you at the meeting.',
    timestamp: 'Last Week',
    unreadCount: 0,
  },
];

type ChatItem = {
  id: string;
  userId: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
};

const ChatList: React.FC = () => {
  const renderChatItem = ({ item }: { item: ChatItem }) => {
    const user = users.find((u) => u.id === item.userId);

    if (!user) return null;

    return (
      <Link
        className="flex-row items-center border-b border-gray-200 p-4 w-full justify-between"
        href={`/messages/${item.id}`}>
        <Image source={{ uri: user.avatar }} className="mr-4 h-12 w-12 rounded-full" />
        <View className="flex-1">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-foreground">{user.name}</Text>
            <Text className="text-sm text-secondary">{item.timestamp}</Text>
          </View>
          <View className="mt-1 flex-row items-center justify-between">
            <Text className="mr-2 flex-1 text-base text-foreground/85" numberOfLines={1}>
              {item.lastMessage}
            </Text>
            {item.unreadCount > 0 && (
              <View className="h-6 w-6 items-center justify-center rounded-full bg-primary">
                <Text className="text-xs font-bold text-white">{item.unreadCount}</Text>
              </View>
            )}
          </View>
        </View>
      </Link>
    );
  };

  return (
    <View className="flex-1 bg-background">
      <View className="bg-primary p-4">
        <Text className="text-2xl font-bold text-white">Messages</Text>
      </View>
      <FlashList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        estimatedItemSize={70}
      />
    </View>
  );
};

export default ChatList;
