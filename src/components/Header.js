// components/Header.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { MessageSquarePlus } from 'lucide-react-native';
import { useTheme } from '../hooks/useTheme';

// Added 'mode' prop to the arguments
export default function Header({ mode }) {
  // Pass 'mode' into useTheme so it updates when you toggle the switch
  const theme = useTheme(mode);
  
  return (
    <View style={styles.header}>
      <Image 
        source={{ uri: 'https://via.placeholder.com/40' }} 
        style={styles.profilePic} 
      />
      <Text style={[styles.headerTitle, { color: theme.text }]}>Chats</Text>
      <MessageSquarePlus color={theme.text} size={28} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  profilePic: { width: 40, height: 40, borderRadius: 20 },
  headerTitle: { fontSize: 22, fontWeight: 'bold' },
});