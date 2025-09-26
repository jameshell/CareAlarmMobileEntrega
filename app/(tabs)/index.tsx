import MaterialDesignIcon from '@react-native-vector-icons/material-design-icons';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
    Avatar,
    Button,
    Card,
    FAB,
    Paragraph,
    Title,
    useTheme,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/contexts/auth-context';

export default function HomeScreen() {
  const { user } = useAuth();
  const theme = useTheme();

  const handleEmergencyAlert = () => {
    // TODO: Implement emergency alert functionality
    alert('¡Alerta de emergencia activada!');
  };

  const handleQuickCheck = () => {
    // TODO: Implement quick check functionality
    alert('Realizando verificación rápida...');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Title style={styles.greeting}>¡Hola, {user?.name}!</Title>
            <Paragraph style={styles.subtitle}>¿Cómo te sientes hoy?</Paragraph>
          </View>
          <Avatar.Icon
            size={48}
            icon="account"
            style={{ backgroundColor: theme.colors.primary }}
          />
        </View>

        {/* Emergency Button */}
        <Card style={[styles.emergencyCard, { backgroundColor: '#FEE2E2' }]}>
          <Card.Content style={styles.emergencyContent}>
            <MaterialDesignIcon
              name="alert-octagon"
              size={48}
              color="#DC2626"
            />
            <View style={styles.emergencyText}>
              <Title style={[styles.emergencyTitle, { color: '#DC2626' }]}>
                Emergencia
              </Title>
              <Paragraph style={[styles.emergencyDescription, { color: '#7F1D1D' }]}>
                Presiona para activar alerta de emergencia
              </Paragraph>
            </View>
            <Button
              mode="contained"
              onPress={handleEmergencyAlert}
              style={[styles.emergencyButton, { backgroundColor: '#DC2626' }]}
              contentStyle={styles.emergencyButtonContent}
            >
              ALERTA
            </Button>
          </Card.Content>
        </Card>

        {/* Status Cards */}
        <View style={styles.statusGrid}>
          <Card style={styles.statusCard}>
            <Card.Content style={styles.statusContent}>
              <MaterialDesignIcon
                name="heart-pulse"
                size={32}
                color={theme.colors.primary}
              />
              <Title style={styles.statusTitle}>Estado</Title>
              <Paragraph style={styles.statusValue}>Bien</Paragraph>
            </Card.Content>
          </Card>

          <Card style={styles.statusCard}>
            <Card.Content style={styles.statusContent}>
              <MaterialDesignIcon
                name="clock-outline"
                size={32}
                color={theme.colors.primary}
              />
              <Title style={styles.statusTitle}>Última revisión</Title>
              <Paragraph style={styles.statusValue}>2h ago</Paragraph>
            </Card.Content>
          </Card>
        </View>

        {/* Quick Actions */}
        <Card style={styles.actionsCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Acciones Rápidas</Title>
            
            <View style={styles.actionsGrid}>
              <Button
                mode="outlined"
                onPress={handleQuickCheck}
                style={styles.actionButton}
                contentStyle={styles.actionButtonContent}
                icon="clipboard-check"
              >
                Chequeo Rápido
              </Button>
              
              <Button
                mode="outlined"
                onPress={() => alert('Configurando medicamentos...')}
                style={styles.actionButton}
                contentStyle={styles.actionButtonContent}
                icon="pill"
              >
                Medicamentos
              </Button>
              
              <Button
                mode="outlined"
                onPress={() => alert('Viendo historial...')}
                style={styles.actionButton}
                contentStyle={styles.actionButtonContent}
                icon="history"
              >
                Historial
              </Button>
              
              <Button
                mode="outlined"
                onPress={() => alert('Configurando contactos...')}
                style={styles.actionButton}
                contentStyle={styles.actionButtonContent}
                icon="contacts"
              >
                Contactos
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Recent Activity */}
        <Card style={styles.activityCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Actividad Reciente</Title>
            
            <View style={styles.activityItem}>
              <MaterialDesignIcon
                name="check-circle"
                size={24}
                color={theme.colors.primary}
              />
              <View style={styles.activityText}>
                <Paragraph style={styles.activityTitle}>Chequeo completado</Paragraph>
                <Paragraph style={styles.activityTime}>Hace 2 horas</Paragraph>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <MaterialDesignIcon
                name="pill"
                size={24}
                color={theme.colors.secondary}
              />
              <View style={styles.activityText}>
                <Paragraph style={styles.activityTitle}>Medicamento tomado</Paragraph>
                <Paragraph style={styles.activityTime}>Hace 4 horas</Paragraph>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <MaterialDesignIcon
                name="account-plus"
                size={24}
                color={theme.colors.tertiary}
              />
              <View style={styles.activityText}>
                <Paragraph style={styles.activityTitle}>Contacto agregado</Paragraph>
                <Paragraph style={styles.activityTime}>Ayer</Paragraph>
              </View>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Floating Action Button */}
      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => alert('Agregando nueva entrada...')}
      />
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
    paddingBottom: 80, // Space for FAB
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  emergencyCard: {
    elevation: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  emergencyContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  emergencyText: {
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  emergencyDescription: {
    fontSize: 14,
    opacity: 0.8,
  },
  emergencyButton: {
    borderRadius: 24,
  },
  emergencyButtonContent: {
    height: 48,
    paddingHorizontal: 16,
  },
  statusGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statusCard: {
    flex: 1,
    elevation: 2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statusContent: {
    alignItems: 'center',
    padding: 16,
    gap: 8,
  },
  statusTitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  statusValue: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  actionsCard: {
    elevation: 2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    minWidth: '45%',
    borderRadius: 12,
  },
  actionButtonContent: {
    height: 56,
  },
  activityCard: {
    elevation: 2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 8,
  },
  activityText: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  activityTime: {
    fontSize: 12,
    opacity: 0.7,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
