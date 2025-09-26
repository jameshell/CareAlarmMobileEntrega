import { router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { useAuth } from '@/contexts/auth-context';

export default function IndexScreen() {
  const { user, isLoading, isInitialized } = useAuth();
  const theme = useTheme();

  useFocusEffect(
    useCallback(() => {
      if (isInitialized && !isLoading) {
        // Use requestAnimationFrame to ensure navigation happens after render
        requestAnimationFrame(() => {
          if (user) {
            router.replace('/(tabs)');
          } else {
            router.replace('/login');
          }
        });
      }
    }, [user, isLoading, isInitialized])
  );

  return (
    <View style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: theme.colors.background 
    }}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
}
