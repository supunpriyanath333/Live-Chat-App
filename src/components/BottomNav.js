import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MessageSquare, Phone, Settings } from 'lucide-react-native';
import { useTheme } from '../hooks/useTheme';

// Added 'mode' prop to the arguments
export default function BottomNav({ onNavigate, currentTab, mode }) {
  // Pass 'mode' into useTheme so the colors react to your toggle
  const theme = useTheme(mode);
  
  return (
    <View style={[styles.nav, { backgroundColor: theme.background, borderTopColor: theme.border }]}>
      <NavItem 
        icon={MessageSquare} 
        label="Chats" 
        onPress={() => onNavigate('Home')}
        color={currentTab === 'Home' ? theme.primary : theme.secondaryText} 
      />
      <NavItem 
        icon={Phone} 
        label="Calls" 
        color={theme.secondaryText} 
      />
      <NavItem 
        icon={Settings} 
        label="Settings" 
        onPress={() => onNavigate('Settings')}
        color={currentTab === 'Settings' ? theme.primary : theme.secondaryText} 
      />
    </View>
  );
}

const NavItem = ({ icon: Icon, label, active, color, onPress }) => (
  <TouchableOpacity style={styles.navItem} onPress={onPress}>
    <Icon color={color} size={24} />
    <Text style={[styles.navText, { color: color }]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  nav: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, borderTopWidth: 0.5 },
  navItem: { alignItems: 'center' },
  navText: { fontSize: 12, marginTop: 4 },
});