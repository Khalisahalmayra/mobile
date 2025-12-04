import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Splash / Home awal (app/index.tsx) */}
        <Stack.Screen name="index" />

        {/* Auth Screens */}
        <Stack.Screen name="screens/LoginScreen" />
        <Stack.Screen name="screens/RegisterScreen" />

        {/* Tabs layout */}
        <Stack.Screen name="(tabs)" />

        {/* Drawer layout (kalau ada) */}
        <Stack.Screen name="(drawer)" />

        {/* Modal */}
        <Stack.Screen 
          name="modal" 
          options={{ presentation: 'modal', headerShown: true, title: 'Modal' }} 
        />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
