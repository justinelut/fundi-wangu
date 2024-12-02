import { useAuth } from '@/lib/appwriteprovider';
import React from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';


const LogoutScreen: React.FC = () => {
  const { logout, isLoading, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {user ? (
            <>
              <Text style={styles.message}>Logged in as: {user.name || user.email}</Text>
              <Button title="Log Out" onPress={handleLogout} />
            </>
          ) : (
            <Text style={styles.message}>You are not logged in.</Text>
          )}
        </>
      )}
    </View>
  );
};

export default LogoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  message: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
});
