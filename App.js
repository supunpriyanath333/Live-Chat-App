import React, { useState } from 'react';
import { useColorScheme, View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import your screens
import Home from './src/screens/Home';
import Settings from './src/screens/Settings';
import Calls from './src/screens/calls';
import ChatScreen from './src/screens/ChatScreen';
import LoginScreen from './src/screens/LoginScreen';
import OTPScreen from './src/screens/OTPScreen';
import ProfileSetupScreen from './src/screens/ProfileSetupScreen';
import ContactsScreen from './src/screens/ContactsScreen';
import AddContactScreen from './src/screens/AddContactScreen';

export default function App() {
  // 1. Get the initial system theme (dark or light)
  const systemScheme = useColorScheme();

  // 2. State to manage manual dark mode toggle
  const [isDarkMode, setIsDarkMode] = useState(systemScheme === 'dark');

  // 3. Authentication State
  const [authStep, setAuthStep] = useState('login'); // 'login', 'otp', 'profile', 'app'
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  // 4. State to manage navigation
  const [currentTab, setCurrentTab] = useState('Home');
  const [showContacts, setShowContacts] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);

  // 5. State to manage active chat (for Chat Screen)
  const [activeChat, setActiveChat] = useState(null);

  // Function to toggle the theme
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Determine the mode string ('dark' or 'light') to pass down
  const mode = isDarkMode ? 'dark' : 'light';

  // Auth Handlers
  const handleSendOTP = (targetEmail) => {
    setEmail(targetEmail);
    setAuthStep('otp');
  };

  const handleVerifyOTP = (code) => {
    // In a real app, verify code here
    setAuthStep('profile');
  };

  const handleProfileComplete = (profileData) => {
    setUser({ email, ...profileData });
    setAuthStep('app');
  };

  const renderContent = () => {
    if (authStep === 'login') {
      return <LoginScreen onSendOTP={handleSendOTP} mode={mode} />;
    }
    if (authStep === 'otp') {
      return <OTPScreen email={email} onVerify={handleVerifyOTP} onBack={() => setAuthStep('login')} mode={mode} />;
    }
    if (authStep === 'profile') {
      return <ProfileSetupScreen onComplete={handleProfileComplete} mode={mode} />;
    }

    if (showAddContact) {
      return (
        <AddContactScreen
          onBack={() => setShowAddContact(false)}
          onAdd={(newContact) => {
            console.log('Added Contact:', newContact);
            setShowAddContact(false);
          }}
          mode={mode}
          userAvatar={user?.avatar}
        />
      );
    }

    if (showContacts) {
      return (
        <ContactsScreen
          onBack={() => setShowContacts(false)}
          onOpenChat={(chat) => {
            setActiveChat(chat);
            setShowContacts(false);
          }}
          onOpenAddContact={() => setShowAddContact(true)}
          onNavigate={(tab) => {
            setCurrentTab(tab);
            setShowContacts(false);
          }}
          mode={mode}
          user={user}
        />
      );
    }

    if (activeChat) {
      return (
        <ChatScreen
          chat={activeChat}
          onBack={() => setActiveChat(null)}
          mode={mode}
        />
      );
    }

    switch (currentTab) {
      case 'Home':
        return (
          <Home
            onNavigate={setCurrentTab}
            onOpenChat={setActiveChat}
            onOpenContacts={() => setShowContacts(true)}
            mode={mode}
            user={user}
          />
        );
      case 'Calls':
        return <Calls onNavigate={setCurrentTab} mode={mode} user={user} />;
      case 'Settings':
        return (
          <Settings
            onNavigate={setCurrentTab}
            isDarkMode={isDarkMode}
            onToggleTheme={toggleTheme}
            mode={mode}
          />
        );
      default:
        return (
          <Home
            onNavigate={setCurrentTab}
            onOpenChat={setActiveChat}
            onOpenContacts={() => setShowContacts(true)}
            mode={mode}
            user={user}
          />
        );
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {/* Update StatusBar based on theme */}
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />
        {renderContent()}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});