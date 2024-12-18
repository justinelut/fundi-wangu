import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

export const Example: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer!',
        createdAt: new Date(),
        image: 'https://i.pravatar.cc/150?img=1',
        // You can also add a video prop:
  
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://i.pravatar.cc/150?img=1',
        },
      },
      {
        _id: 2,
        text: 'How can I help you today?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 3,
        text: 'I am exploring React Native Gifted Chat.',
        createdAt: new Date(new Date().getTime() - 60 * 1000), // 1 minute ago
        user: {
          _id: 1,
          name: 'Developer',
        },
      },
      {
        _id: 4,
        text: 'That’s great! It’s a powerful library for building chat UIs.',
        createdAt: new Date(new Date().getTime() - 2 * 60 * 1000), // 2 minutes ago
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 5,
        text: 'Can it handle real-time messages?',
        createdAt: new Date(new Date().getTime() - 3 * 60 * 1000), // 3 minutes ago
        user: {
          _id: 1,
          name: 'Developer',
        },
      },
      {
        _id: 6,
        text: 'Yes, you can integrate it with a real-time backend like Firebase!',
        createdAt: new Date(new Date().getTime() - 4 * 60 * 1000), // 4 minutes ago
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((newMessages: IMessage[] = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => onSend(newMessages)}
      user={{
        _id: 1,
      }}
    />
  );
};

export default Example;
