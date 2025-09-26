import MaterialDesignIcon from '@react-native-vector-icons/material-design-icons';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import {
    Badge,
    Button,
    Card,
    IconButton,
    Paragraph,
    Title,
    useTheme,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Notification {
  id: string;
  type: 'emergency' | 'medication' | 'checkup' | 'system' | 'reminder';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'emergency',
    title: 'Alerta de Emergencia',
    message: 'Su contacto de emergencia ha sido notificado de su estado actual',
    timestamp: '2024-01-15 14:30',
    isRead: false,
    priority: 'urgent',
  },
  {
    id: '2',
    type: 'medication',
    title: 'Recordatorio de Medicamento',
    message: 'Es hora de tomar su Aspirina 100mg',
    timestamp: '2024-01-15 08:00',
    isRead: false,
    priority: 'high',
  },
  {
    id: '3',
    type: 'checkup',
    title: 'Chequeo Programado',
    message: 'Recuerde completar su chequeo de bienestar diario',
    timestamp: '2024-01-15 07:00',
    isRead: true,
    priority: 'medium',
  },
  {
    id: '4',
    type: 'system',
    title: 'Actualización de Seguridad',
    message: 'Se ha actualizado la configuración de seguridad de su cuenta',
    timestamp: '2024-01-14 16:45',
    isRead: true,
    priority: 'low',
  },
  {
    id: '5',
    type: 'reminder',
    title: 'Cita Médica Próxima',
    message: 'Tiene una cita con Dr. García mañana a las 10:00 AM',
    timestamp: '2024-01-14 12:00',
    isRead: false,
    priority: 'medium',
  },
  {
    id: '6',
    type: 'medication',
    title: 'Medicamento Perdido',
    message: 'No tomó su Vitamina D a la hora programada',
    timestamp: '2024-01-13 21:15',
    isRead: true,
    priority: 'medium',
  },
];

export default function NotificacionesScreen() {
  const theme = useTheme();
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'emergency': return 'alert-octagon';
      case 'medication': return 'pill';
      case 'checkup': return 'clipboard-check';
      case 'system': return 'cog';
      case 'reminder': return 'bell';
      default: return 'information';
    }
  };

  const getTypeColor = (type: string, priority: string) => {
    if (priority === 'urgent') return theme.colors.error;
    
    switch (type) {
      case 'emergency': return theme.colors.error;
      case 'medication': return theme.colors.primary;
      case 'checkup': return theme.colors.secondary;
      case 'system': return theme.colors.tertiary;
      case 'reminder': return '#F59E0B';
      default: return theme.colors.onSurfaceVariant;
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return '#DC2626';
      case 'high': return '#EA580C';
      case 'medium': return '#D97706';
      case 'low': return '#65A30D';
      default: return theme.colors.onSurfaceVariant;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <Card 
      style={[
        styles.notificationCard,
        !item.isRead && styles.unreadCard
      ]}
      onPress={() => markAsRead(item.id)}
    >
      <Card.Content style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <View style={[
            styles.notificationIcon,
            { backgroundColor: `${getTypeColor(item.type, item.priority)}20` }
          ]}>
            <MaterialDesignIcon
              name={getTypeIcon(item.type)}
              size={24}
              color={getTypeColor(item.type, item.priority)}
            />
          </View>
          
          <View style={styles.notificationInfo}>
            <View style={styles.titleRow}>
              <Title style={[
                styles.notificationTitle,
                !item.isRead && styles.unreadTitle
              ]}>
                {item.title}
              </Title>
              {!item.isRead && (
                <Badge style={[
                  styles.priorityBadge,
                  { backgroundColor: getPriorityBadgeColor(item.priority) }
                ]}>
                  {item.priority.toUpperCase()}
                </Badge>
              )}
            </View>
            
            <Paragraph style={[
              styles.notificationMessage,
              !item.isRead && styles.unreadMessage
            ]}>
              {item.message}
            </Paragraph>
            
            <Paragraph style={styles.notificationTimestamp}>
              {item.timestamp}
            </Paragraph>
          </View>

          <IconButton
            icon="close"
            size={20}
            onPress={() => deleteNotification(item.id)}
            style={styles.deleteButton}
          />
        </View>

        {!item.isRead && <View style={styles.unreadIndicator} />}
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialDesignIcon
            name="bell"
            size={32}
            color={theme.colors.primary}
          />
          <Title style={styles.headerTitle}>Notificaciones</Title>
          {unreadCount > 0 && (
            <Badge style={styles.headerBadge}>{unreadCount}</Badge>
          )}
        </View>
        
        {unreadCount > 0 && (
          <Button
            mode="text"
            onPress={markAllAsRead}
            compact
            textColor={theme.colors.primary}
          >
            Marcar todas
          </Button>
        )}
      </View>

      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.notificationsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <MaterialDesignIcon
              name="bell-off"
              size={64}
              color={theme.colors.onSurfaceVariant}
              style={styles.emptyIcon}
            />
            <Title style={styles.emptyTitle}>No hay notificaciones</Title>
            <Paragraph style={styles.emptyMessage}>
              Todas las notificaciones aparecerán aquí
            </Paragraph>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingBottom: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerBadge: {
    backgroundColor: '#DC2626',
    color: '#FFFFFF',
  },
  notificationsList: {
    padding: 16,
    gap: 12,
  },
  notificationCard: {
    elevation: 2,
    borderRadius: 12,
    position: 'relative',
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
  },
  notificationContent: {
    padding: 16,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  notificationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  notificationInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  unreadTitle: {
    fontWeight: '700',
  },
  priorityBadge: {
    height: 20,
    minWidth: 50,
    borderRadius: 10,
    fontSize: 10,
    fontWeight: 'bold',
  },
  notificationMessage: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 8,
    lineHeight: 20,
  },
  unreadMessage: {
    opacity: 1,
    fontWeight: '500',
  },
  notificationTimestamp: {
    fontSize: 12,
    opacity: 0.6,
    fontWeight: '500',
  },
  deleteButton: {
    margin: 0,
    marginTop: -8,
  },
  unreadIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2563EB',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyIcon: {
    opacity: 0.3,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    opacity: 0.6,
  },
  emptyMessage: {
    fontSize: 14,
    opacity: 0.5,
    textAlign: 'center',
  },
});
