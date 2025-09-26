import MaterialDesignIcon from '@react-native-vector-icons/material-design-icons';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import {
    Card,
    Chip,
    Paragraph,
    Searchbar,
    SegmentedButtons,
    Title,
    useTheme,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface HistoryItem {
  id: string;
  type: 'emergency' | 'medication' | 'checkup' | 'contact';
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'missed' | 'cancelled';
}

const mockHistoryData: HistoryItem[] = [
  {
    id: '1',
    type: 'emergency',
    title: 'Alerta de emergencia activada',
    description: 'Se activó la alerta y se notificó a los contactos de emergencia',
    timestamp: '2024-01-15 14:30',
    status: 'completed',
  },
  {
    id: '2',
    type: 'medication',
    title: 'Medicamento tomado',
    description: 'Aspirina 100mg - Dosis matutina',
    timestamp: '2024-01-15 08:00',
    status: 'completed',
  },
  {
    id: '3',
    type: 'checkup',
    title: 'Chequeo completado',
    description: 'Revisión de signos vitales y bienestar general',
    timestamp: '2024-01-14 16:45',
    status: 'completed',
  },
  {
    id: '4',
    type: 'medication',
    title: 'Medicamento perdido',
    description: 'Vitamina D - Dosis nocturna',
    timestamp: '2024-01-13 21:00',
    status: 'missed',
  },
  {
    id: '5',
    type: 'contact',
    title: 'Contacto agregado',
    description: 'Dr. García - Médico de cabecera',
    timestamp: '2024-01-12 10:15',
    status: 'completed',
  },
  {
    id: '6',
    type: 'checkup',
    title: 'Cita cancelada',
    description: 'Revisión médica mensual',
    timestamp: '2024-01-11 09:30',
    status: 'cancelled',
  },
];

export default function HistorialScreen() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'emergency': return 'alert-octagon';
      case 'medication': return 'pill';
      case 'checkup': return 'clipboard-check';
      case 'contact': return 'account-plus';
      default: return 'history';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'emergency': return theme.colors.error;
      case 'medication': return theme.colors.primary;
      case 'checkup': return theme.colors.secondary;
      case 'contact': return theme.colors.tertiary;
      default: return theme.colors.onSurfaceVariant;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'missed': return '#EF4444';
      case 'cancelled': return '#6B7280';
      default: return theme.colors.onSurfaceVariant;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completado';
      case 'missed': return 'Perdido';
      case 'cancelled': return 'Cancelado';
      default: return 'Desconocido';
    }
  };

  const filteredData = mockHistoryData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const renderHistoryItem = ({ item }: { item: HistoryItem }) => (
    <Card style={styles.historyCard}>
      <Card.Content style={styles.historyContent}>
        <View style={styles.historyHeader}>
          <View style={styles.historyIcon}>
            <MaterialDesignIcon
              name={getTypeIcon(item.type)}
              size={24}
              color={getTypeColor(item.type)}
            />
          </View>
          <View style={styles.historyInfo}>
            <Title style={styles.historyTitle}>{item.title}</Title>
            <Paragraph style={styles.historyDescription}>
              {item.description}
            </Paragraph>
            <Paragraph style={styles.historyTimestamp}>
              {item.timestamp}
            </Paragraph>
          </View>
          <Chip
            mode="outlined"
            textStyle={[styles.statusChipText, { color: getStatusColor(item.status) }]}
            style={[styles.statusChip, { borderColor: getStatusColor(item.status) }]}
          >
            {getStatusText(item.status)}
          </Chip>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <MaterialDesignIcon
          name="history"
          size={32}
          color={theme.colors.primary}
        />
        <Title style={styles.headerTitle}>Historial</Title>
      </View>

      <View style={styles.content}>
        {/* Search Bar */}
        <Searchbar
          placeholder="Buscar en historial..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          iconColor={theme.colors.primary}
        />

        {/* Filter Buttons */}
        <SegmentedButtons
          value={filterType}
          onValueChange={setFilterType}
          buttons={[
            { value: 'all', label: 'Todo' },
            { value: 'emergency', label: 'Emergencias', icon: 'alert-octagon' },
            { value: 'medication', label: 'Medicamentos', icon: 'pill' },
            { value: 'checkup', label: 'Revisiones', icon: 'clipboard-check' },
          ]}
          style={styles.filterButtons}
        />

        {/* History List */}
        <FlatList
          data={filteredData}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.historyList}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
    gap: 12,
    padding: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchBar: {
    marginBottom: 16,
    borderRadius: 12,
  },
  filterButtons: {
    marginBottom: 16,
  },
  historyList: {
    gap: 12,
    paddingBottom: 16,
  },
  historyCard: {
    elevation: 2,
    borderRadius: 12,
  },
  historyContent: {
    padding: 16,
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  historyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  historyInfo: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  historyDescription: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 8,
    lineHeight: 20,
  },
  historyTimestamp: {
    fontSize: 12,
    opacity: 0.6,
    fontWeight: '500',
  },
  statusChip: {
    height: 28,
    marginTop: 4,
  },
  statusChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
