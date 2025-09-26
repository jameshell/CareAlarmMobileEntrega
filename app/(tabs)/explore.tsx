import MaterialDesignIcon from '@react-native-vector-icons/material-design-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Divider,
  List,
  Paragraph,
  Title,
  useTheme,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/contexts/auth-context';

export default function SettingsScreen() {
  const { user, logout } = useAuth();
  const theme = useTheme();

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Title style={styles.headerTitle}>Ajustes</Title>
        </View>

        {/* User Account Card */}
        <Card style={styles.profileCard}>
          <Card.Content style={styles.profileContent}>
            <Avatar.Icon
              size={64}
              icon="account"
              style={[styles.avatar, { backgroundColor: theme.colors.primary }]}
            />
            <View style={styles.userInfo}>
              <Title style={styles.userName}>{user?.name || 'Usuario'}</Title>
              <Paragraph style={styles.userEmail}>{user?.email}</Paragraph>
            </View>
            <MaterialDesignIcon
              name="chevron-right"
              size={24}
              color={theme.colors.onSurfaceVariant}
            />
          </Card.Content>
        </Card>

        {/* Settings Section */}
        <Card style={styles.settingsCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Configuración</Title>
            
            <List.Item
              title="Notificaciones"
              description="Configurar alertas y notificaciones"
              left={(props) => <List.Icon {...props} icon="bell" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {}}
            />
            
            <Divider />
            
            <List.Item
              title="Privacidad"
              description="Configuración de privacidad y seguridad"
              left={(props) => <List.Icon {...props} icon="shield-account" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {}}
            />
            
            <Divider />
            
            <List.Item
              title="Ayuda"
              description="Centro de ayuda y soporte"
              left={(props) => <List.Icon {...props} icon="help-circle" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {}}
            />
            
            <Divider />
            
            <List.Item
              title="Acerca de"
              description="Información sobre la aplicación"
              left={(props) => <List.Icon {...props} icon="information" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {}}
            />
          </Card.Content>
        </Card>

        {/* Emergency Contacts Section */}
        <Card style={styles.emergencyCard}>
          <Card.Content>
            <View style={styles.emergencyHeader}>
              <MaterialDesignIcon
                name="phone-alert"
                size={24}
                color={theme.colors.error}
              />
              <Title style={[styles.sectionTitle, { color: theme.colors.error }]}>
                Contactos de Emergencia
              </Title>
            </View>
            
            <Paragraph style={styles.emergencyDescription}>
              Configura contactos que serán notificados en caso de emergencia
            </Paragraph>
            
            <Button
              mode="outlined"
              onPress={() => {}}
              style={styles.emergencyButton}
              icon="plus"
            >
              Agregar Contacto
            </Button>
          </Card.Content>
        </Card>

        {/* Logout Button */}
        <Button
          mode="contained"
          onPress={handleLogout}
          style={[styles.logoutButton, { backgroundColor: theme.colors.error }]}
          contentStyle={styles.logoutButtonContent}
          icon="logout"
        >
          Cerrar Sesión
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
    gap: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileCard: {
    elevation: 4,
    borderRadius: 16,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  avatar: {
    marginBottom: 0,
  },
  userInfo: {
    flex: 1,
    alignItems: 'flex-start',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    opacity: 0.7,
  },
  settingsCard: {
    elevation: 4,
    borderRadius: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emergencyCard: {
    elevation: 4,
    borderRadius: 16,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  emergencyDescription: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 16,
  },
  emergencyButton: {
    borderRadius: 8,
  },
  logoutButton: {
    borderRadius: 28,
    marginTop: 8,
  },
  logoutButtonContent: {
    height: 48,
  },
});
