import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { ArrowLeft, Send } from 'lucide-react-native';
import { useLocalSearchParams } from 'expo-router';

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

const ChatScreen: React.FC<ChatScreenProps> = ({ onBack }) => {
  const [newMessage, setNewMessage] = useState('');
  const { chatid } = useLocalSearchParams();
  const [inputHeight, setInputHeight] = useState(40);

  const chatMessages = messages.filter((m) => m.chatId === chatid);
  const user = users.find((u) => u.id === chatMessages[0]?.userId);

  if (!user) return null;

  const renderMessage = ({ item }: { item: Message }) => (
    <View className={`flex-row ${item.isSent ? 'justify-end' : 'justify-start'} mb-3`}>
      <View
        className={`max-w-[80%] rounded-lg p-4 shadow-sm ${
          item.isSent ? 'bg-primary' : 'bg-gray-100'
        }`}>
        <Text className={`text-base ${item.isSent ? 'text-white' : 'text-gray-800'}`}>
          {item.text}
        </Text>
        <Text className={`mt-2 text-xs ${item.isSent ? 'text-white/70' : 'text-gray-500'}`}>
          {item.timestamp}
        </Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    keyboardVerticalOffset={80} // Adjust as per your header height
  >
    <View className="flex-1 bg-background">
      <View className="flex-row items-center bg-primary p-4 shadow-md">
        <TouchableOpacity onPress={onBack} className="mr-4">
          <ArrowLeft color="white" size={24} />
        </TouchableOpacity>
        <Image
          source={{ uri: user.avatar }}
          className="mr-3 h-10 w-10 rounded-full border border-white"
        />
        <Text className="text-xl font-semibold text-white">{user.name}</Text>
      </View>
      <FlashList
        data={chatMessages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        estimatedItemSize={70}
      />
      <View className="flex-row items-center border-t border-accent/10 bg-accent/55 p-3">
        <TextInput
          className="flex-1 rounded-2xl bg-accent px-4 text-base text-foreground/85"
          placeholder="Type a message"
          placeholderTextColor="gray"
          value={newMessage}
          multiline
          style={{ height: inputHeight, maxHeight: 120 }}
          onContentSizeChange={(e) => {
            const newHeight = Math.min(e.nativeEvent.contentSize.height, 90);
            setInputHeight(newHeight);
          }}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity
          className="ml-2 rounded-full bg-primary p-3 shadow-md"
          onPress={() => {
            // Handle sending message
            setNewMessage('');
          }}>
          <Send color="white" size={20} />
        </TouchableOpacity>
      </View>
    </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
