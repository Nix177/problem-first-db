import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { FrustraTheme } from '@/constants/FrustraTheme';

const AppTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: FrustraTheme.colors.background,
    card: FrustraTheme.colors.surface,
    text: FrustraTheme.colors.text,
    primary: FrustraTheme.colors.primary,
  },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={AppTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Details' }} />
      </Stack>
      <StatusBar style="light" />
    </ThemeProvider>
  );
}
