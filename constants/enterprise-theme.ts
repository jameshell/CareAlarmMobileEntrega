import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

// Enterprise color palette
const enterpriseColors = {
  primary: '#2563EB', // Blue
  primaryContainer: '#DBEAFE',
  onPrimary: '#FFFFFF',
  onPrimaryContainer: '#1E40AF',
  
  secondary: '#64748B', // Slate grey
  secondaryContainer: '#F1F5F9',
  onSecondary: '#FFFFFF',
  onSecondaryContainer: '#334155',
  
  tertiary: '#6B7280', // Grey
  tertiaryContainer: '#F3F4F6',
  onTertiary: '#FFFFFF',
  onTertiaryContainer: '#374151',
  
  surface: '#FFFFFF',
  surfaceVariant: '#F8FAFC',
  onSurface: '#0F172A',
  onSurfaceVariant: '#64748B',
  
  background: '#F8FAFC',
  onBackground: '#0F172A',
  
  outline: '#CBD5E1',
  outlineVariant: '#E2E8F0',
  
  error: '#DC2626',
  errorContainer: '#FEE2E2',
  onError: '#FFFFFF',
  onErrorContainer: '#B91C1C',
  
  // Custom enterprise colors
  cardBackground: '#FFFFFF',
  cardBorder: '#E2E8F0',
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textTertiary: '#94A3B8',
  
  // Navigation colors
  navigationBackground: '#FFFFFF',
  navigationBorder: '#E2E8F0',
  navigationActive: '#2563EB',
  navigationInactive: '#94A3B8',
};

const enterpriseColorsDark = {
  primary: '#3B82F6', // Lighter blue for dark mode
  primaryContainer: '#1E40AF',
  onPrimary: '#FFFFFF',
  onPrimaryContainer: '#DBEAFE',
  
  secondary: '#94A3B8', // Lighter slate grey
  secondaryContainer: '#334155',
  onSecondary: '#0F172A',
  onSecondaryContainer: '#F1F5F9',
  
  tertiary: '#9CA3AF', // Lighter grey
  tertiaryContainer: '#374151',
  onTertiary: '#0F172A',
  onTertiaryContainer: '#F3F4F6',
  
  surface: '#1E293B',
  surfaceVariant: '#334155',
  onSurface: '#F1F5F9',
  onSurfaceVariant: '#94A3B8',
  
  background: '#0F172A',
  onBackground: '#F1F5F9',
  
  outline: '#475569',
  outlineVariant: '#334155',
  
  error: '#EF4444',
  errorContainer: '#7F1D1D',
  onError: '#FFFFFF',
  onErrorContainer: '#FEE2E2',
  
  // Custom enterprise colors
  cardBackground: '#1E293B',
  cardBorder: '#334155',
  textPrimary: '#F1F5F9',
  textSecondary: '#94A3B8',
  textTertiary: '#64748B',
  
  // Navigation colors
  navigationBackground: '#1E293B',
  navigationBorder: '#334155',
  navigationActive: '#3B82F6',
  navigationInactive: '#64748B',
};

export const enterpriseLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...enterpriseColors,
  },
};

export const enterpriseDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...enterpriseColorsDark,
  },
};

export { enterpriseColors, enterpriseColorsDark };
