import React, { useState } from 'react';
import { useColorScheme, View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import your screens
import Home from './src/screens/Home';
import Settings from './src/screens/Settings';
import Calls from './src/screens/calls';
import ChatScreen from './src/screens/ChatScreen';

export default function App() {
  // 1. Get the initial system theme (dark or light)
  const systemScheme = useColorScheme();

  // 2. State to manage manual dark mode toggle
  const [isDarkMode, setIsDarkMode] = useState(systemScheme === 'dark');

  // 3. State to manage navigation
  const [currentTab, setCurrentTab] = useState('Home');

  // 4. State to manage active chat (for Chat Screen)
  const [activeChat, setActiveChat] = useState(null);

  // Function to toggle the theme
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Determine the mode string ('dark' or 'light') to pass down
  const mode = isDarkMode ? 'dark' : 'light';

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {/* Update StatusBar based on theme */}
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />

        {activeChat ? (
          <ChatScreen
            chat={activeChat}
            onBack={() => setActiveChat(null)}
            mode={mode}
          />
        ) : currentTab === 'Home' ? (
          <Home
            onNavigate={setCurrentTab}
            onOpenChat={setActiveChat}
            mode={mode}
          />
        ) : currentTab === 'Calls' ? (
          <Calls
            onNavigate={setCurrentTab}
            mode={mode}
          />
        ) : (
          <Settings
            onNavigate={setCurrentTab}
            isDarkMode={isDarkMode}
            onToggleTheme={toggleTheme}
            mode={mode}
          />
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});