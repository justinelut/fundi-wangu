import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { ArrowLeft, Send } from 'lucide-react-native';

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

type ChatScreenProps = {
  chatId: string;
  onBack: () => void;
};

export const users: User[] = [
  { id: '1', name: 'Alice Johnson', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: '2', name: 'Bob Smith', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: '3', name: 'Charlie Brown', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: '4', name: 'Diana Prince', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: '5', name: 'Ethan Hunt', avatar: 'https://i.pravatar.cc/150?img=5' },
];

export const messages: Message[] = [
  { id: '1', chatId: '1', userId: '1', text: 'Hey, how are you doing?', timestamp: '10:30 AM', isSent: false },
  { id: '2', chatId: '1', userId: 'me', text: 'I’m good, thanks! How about you?', timestamp: '10:31 AM', isSent: true },
  { id: '3', chatId: '1', userId: '1', text: 'Doing well too. Any plans for the weekend?', timestamp: '10:32 AM', isSent: false },
  { id: '4', chatId: '1', userId: 'me', text: 'Not yet, maybe catch a movie. You?', timestamp: '10:33 AM', isSent: true },
  { id: '5', chatId: '1', userId: '1', text: 'Sounds good! I might go hiking.', timestamp: '10:34 AM', isSent: false },
];

const ChatScreen: React.FC<ChatScreenProps> = ({ chatId, onBack }) => {
  const [newMessage, setNewMessage] = useState('');

  const chatMessages = messages.filter((m) => m.chatId === chatId);
  const user = users.find((u) => u.id === chatMessages[0]?.userId);

  if (!user) return null;

  const renderMessage = ({ item }: { item: Message }) => (
    <View className={`flex-row ${item.isSent ? 'justify-end' : 'justify-start'} mb-2`}>
      <View
        className={`rounded-lg p-3 max-w-[80%] ${
          item.isSent ? 'bg-primary' : 'bg-gray-200'
        }`}
      >
        <Text className={item.isSent ? 'text-white' : 'text-foreground'}>
          {item.text}
        </Text>
        <Text className={`text-xs mt-1 ${item.isSent ? 'text-white/70' : 'text-secondary'}`}>
          {item.timestamp}
        </Text>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      <View className="bg-primary p-4 flex-row items-center">
        <TouchableOpacity onPress={onBack} className="mr-4">
          <ArrowLeft color="white" size={24} />
        </TouchableOpacity>
        <Image
          source={{ uri: user.avatar }}
          className="w-10 h-10 rounded-full mr-3"
        />
        <Text className="text-xl font-semibold text-white">{user.name}</Text>
      </View>
      <FlashList
        data={chatMessages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        estimatedItemSize={50}
      />
      <View className="flex-row items-center border-t border-gray-200 p-2">
        <TextInput
          className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2"
          placeholder="Type a message"
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity
          className="bg-primary rounded-full p-2"
          onPress={() => {
            // Handle sending message
            setNewMessage('');
          }}
        >
          <Send color="white" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;
