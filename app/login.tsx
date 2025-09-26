import MaterialDesignIcon from '@react-native-vector-icons/material-design-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import {
    ActivityIndicator,
    Button,
    Card,
    Divider,
    Paragraph,
    Snackbar,
    TextInput,
    Title,
    useTheme,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/contexts/auth-context';

interface FormData {
  email: string;
  password: string;
  name?: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  name?: string;
}

export default function LoginScreen() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    name: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const theme = useTheme();
  const { login, register, isLoading } = useAuth();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Ingresa un correo electrónico válido';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    // Name validation for registration
    if (!isLoginMode && !formData.name) {
      newErrors.name = 'El nombre es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      let success = false;
      
      if (isLoginMode) {
        success = await login(formData.email, formData.password);
        if (success) {
          router.replace('/(tabs)');
        } else {
          setSnackbarMessage('Credenciales incorrectas');
          setSnackbarVisible(true);
        }
      } else {
        success = await register(formData.email, formData.password, formData.name || '');
        if (success) {
          router.replace('/(tabs)');
        } else {
          setSnackbarMessage('Error al registrar usuario');
          setSnackbarVisible(true);
        }
      }
    } catch (error) {
      setSnackbarMessage('Error de conexión');
      setSnackbarVisible(true);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setFormData({ email: '', password: '', name: '' });
    setErrors({});
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoContainer}>
            <View style={[styles.logoIcon, { backgroundColor: theme.colors.primary }]}>
              <MaterialDesignIcon
                name="shield-alert"
                size={48}
                color={theme.colors.onPrimary}
              />
            </View>
            <Title style={[styles.appTitle, { color: theme.colors.onBackground }]}>
              Care Alarm
            </Title>
          </View>

          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Title style={styles.cardTitle}>
                {isLoginMode ? 'Iniciar Sesión' : 'Registro'}
              </Title>
              <Paragraph style={styles.cardSubtitle}>
                {isLoginMode 
                  ? 'Ingresa tus credenciales para continuar' 
                  : 'Crea una nueva cuenta para comenzar'
                }
              </Paragraph>

              <View style={styles.form}>
                {!isLoginMode && (
                  <TextInput
                    label="Nombre completo"
                    value={formData.name}
                    onChangeText={(text) => handleInputChange('name', text)}
                    mode="outlined"
                    style={styles.input}
                    error={!!errors.name}
                    left={<TextInput.Icon icon="account" />}
                    disabled={isLoading}
                  />
                )}
                {errors.name && (
                  <Paragraph style={styles.errorText}>{errors.name}</Paragraph>
                )}

                <TextInput
                  label="Correo Electrónico"
                  value={formData.email}
                  onChangeText={(text) => handleInputChange('email', text)}
                  mode="outlined"
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={!!errors.email}
                  left={<TextInput.Icon icon="email" />}
                  disabled={isLoading}
                />
                {errors.email && (
                  <Paragraph style={styles.errorText}>{errors.email}</Paragraph>
                )}

                <TextInput
                  label="Contraseña"
                  value={formData.password}
                  onChangeText={(text) => handleInputChange('password', text)}
                  mode="outlined"
                  style={styles.input}
                  secureTextEntry={!showPassword}
                  error={!!errors.password}
                  left={<TextInput.Icon icon="lock" />}
                  right={
                    <TextInput.Icon
                      icon={showPassword ? 'eye-off' : 'eye'}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                  disabled={isLoading}
                />
                {errors.password && (
                  <Paragraph style={styles.errorText}>{errors.password}</Paragraph>
                )}

                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  style={styles.submitButton}
                  contentStyle={styles.submitButtonContent}
                  disabled={isLoading}
                  icon={isLoginMode ? 'login' : 'account-plus'}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color={theme.colors.onPrimary} />
                  ) : (
                    isLoginMode ? 'Iniciar Sesión' : 'Registrarse'
                  )}
                </Button>

                <Divider style={styles.divider} />

                <Button
                  mode="text"
                  onPress={toggleMode}
                  style={styles.toggleButton}
                  disabled={isLoading}
                >
                  {isLoginMode
                    ? '¿No tienes cuenta? Regístrate'
                    : '¿Ya tienes cuenta? Inicia sesión'
                  }
                </Button>
              </View>
            </Card.Content>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: 'Cerrar',
          onPress: () => setSnackbarVisible(false),
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoIcon: {
    width: 80,
    height: 80,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  card: {
    elevation: 4,
    borderRadius: 16,
  },
  cardContent: {
    padding: 24,
  },
  cardTitle: {
    textAlign: 'center',
    marginBottom: 8,
    fontSize: 24,
  },
  cardSubtitle: {
    textAlign: 'center',
    marginBottom: 24,
    opacity: 0.7,
  },
  form: {
    gap: 16,
  },
  input: {
    backgroundColor: 'transparent',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 12,
    marginTop: -12,
    marginLeft: 12,
  },
  submitButton: {
    marginTop: 8,
    borderRadius: 28,
  },
  submitButtonContent: {
    height: 48,
  },
  divider: {
    marginVertical: 16,
  },
  toggleButton: {
    marginTop: 8,
  },
});
