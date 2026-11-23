import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemeProvider } from '@/lib/theme-provider';
import { AppErrorBoundary } from '@/components/app-error-boundary';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AppErrorBoundary>
      <ThemeProvider>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="class/[id]" />
          <Stack.Screen name="search" />
          <Stack.Screen name="reader" />
          <Stack.Screen name="login" />
          <Stack.Screen name="admin" />
        </Stack>
      </ThemeProvider>
    </AppErrorBoundary>
  );
}
