import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { chats, users } from './[chatid]';
import { Link } from 'expo-router';

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
