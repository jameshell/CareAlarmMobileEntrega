import MaterialDesignIcon from '@react-native-vector-icons/material-design-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
    Button,
    Card,
    Paragraph,
    SegmentedButtons,
    Switch,
    TextInput,
    Title,
    useTheme,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NuevaAlarmaScreen() {
  const theme = useTheme();
  const [alarmType, setAlarmType] = useState('emergency');
  const [alarmTitle, setAlarmTitle] = useState('');
  const [alarmDescription, setAlarmDescription] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [isLocationBased, setIsLocationBased] = useState(false);

  const handleCreateAlarm = () => {
    // TODO: Implement alarm creation
    alert(`Alarma creada: ${alarmTitle || 'Sin título'}`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <MaterialDesignIcon
            name="alarm-plus"
            size={32}
            color={theme.colors.primary}
          />
          <Title style={styles.headerTitle}>Nueva Alarma</Title>
        </View>

        {/* Alarm Type Selection */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Tipo de Alarma</Title>
            <SegmentedButtons
              value={alarmType}
              onValueChange={setAlarmType}
              buttons={[
                {
                  value: 'emergency',
                  label: 'Emergencia',
                  icon: 'alert-octagon',
                },
                {
                  value: 'medication',
                  label: 'Medicamento',
                  icon: 'pill',
                },
                {
                  value: 'checkup',
                  label: 'Revisión',
                  icon: 'clipboard-check',
                },
              ]}
              style={styles.segmentedButtons}
            />
          </Card.Content>
        </Card>

        {/* Alarm Details */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Detalles</Title>
            
            <TextInput
              label="Título de la alarma"
              value={alarmTitle}
              onChangeText={setAlarmTitle}
              mode="outlined"
              style={styles.input}
              left={<TextInput.Icon icon="text" />}
            />

            <TextInput
              label="Descripción (opcional)"
              value={alarmDescription}
              onChangeText={setAlarmDescription}
              mode="outlined"
              style={styles.input}
              multiline
              numberOfLines={3}
              left={<TextInput.Icon icon="text-long" />}
            />
          </Card.Content>
        </Card>

        {/* Alarm Settings */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Configuración</Title>
            
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Paragraph style={styles.settingTitle}>Alarma recurrente</Paragraph>
                <Paragraph style={styles.settingDescription}>
                  Repetir esta alarma automáticamente
                </Paragraph>
              </View>
              <Switch
                value={isRecurring}
                onValueChange={setIsRecurring}
                color={theme.colors.primary}
              />
            </View>

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Paragraph style={styles.settingTitle}>Basada en ubicación</Paragraph>
                <Paragraph style={styles.settingDescription}>
                  Activar cuando esté en una ubicación específica
                </Paragraph>
              </View>
              <Switch
                value={isLocationBased}
                onValueChange={setIsLocationBased}
                color={theme.colors.primary}
              />
            </View>
          </Card.Content>
        </Card>

        {/* Quick Presets */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Preconfigurados</Title>
            <Paragraph style={styles.sectionDescription}>
              Selecciona una alarma preconfigurada
            </Paragraph>

            <View style={styles.presetGrid}>
              <Button
                mode="outlined"
                onPress={() => {
                  setAlarmTitle('Tomar medicamento');
                  setAlarmType('medication');
                  setIsRecurring(true);
                }}
                style={styles.presetButton}
                icon="pill"
              >
                Medicamento
              </Button>

              <Button
                mode="outlined"
                onPress={() => {
                  setAlarmTitle('Revisión médica');
                  setAlarmType('checkup');
                }}
                style={styles.presetButton}
                icon="stethoscope"
              >
                Cita médica
              </Button>

              <Button
                mode="outlined"
                onPress={() => {
                  setAlarmTitle('Ejercicio diario');
                  setAlarmType('checkup');
                  setIsRecurring(true);
                }}
                style={styles.presetButton}
                icon="run"
              >
                Ejercicio
              </Button>

              <Button
                mode="outlined"
                onPress={() => {
                  setAlarmTitle('Contactar familia');
                  setAlarmType('emergency');
                }}
                style={styles.presetButton}
                icon="phone"
              >
                Llamada
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Create Button */}
        <Button
          mode="contained"
          onPress={handleCreateAlarm}
          style={styles.createButton}
          contentStyle={styles.createButtonContent}
          icon="plus"
          disabled={!alarmTitle.trim()}
        >
          Crear Alarma
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    elevation: 2,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  sectionDescription: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 16,
  },
  segmentedButtons: {
    marginTop: 8,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
  presetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  presetButton: {
    flex: 1,
    minWidth: '45%',
    borderRadius: 8,
  },
  createButton: {
    marginTop: 8,
    borderRadius: 12,
  },
  createButtonContent: {
    height: 48,
  },
});
