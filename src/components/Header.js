// components/Header.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MessageSquarePlus } from 'lucide-react-native';
import { useTheme } from '../hooks/useTheme';
import { GlobalStyles } from '../constants/globalStyles';

// Added 'mode' prop to the arguments
export default function Header({ mode, title, rightIcon, userAvatar, onRightPress, onProfilePress }) {
  // Pass 'mode' into useTheme so it updates when you toggle the switch
  const theme = useTheme(mode);

  // Robust source selection
  const avatarSource = (userAvatar && typeof userAvatar !== 'string') || (typeof userAvatar === 'string' && userAvatar.length > 0)
    ? (typeof userAvatar === 'string' ? { uri: userAvatar } : userAvatar)
    : require('../../assets/google.png');

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onProfilePress}>
        <View style={[
          styles.avatarContainer,
          {
            borderColor: theme.myAvatarBorder,
            backgroundColor: theme.surface,
            // Diagnostic: add a slight shadow
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }
        ]}>
          <Image
            source={avatarSource}
            style={styles.profilePic}
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>
      <Text style={[styles.headerTitle, { color: theme.text }]}>{title || 'Chats'}</Text>
      <TouchableOpacity onPress={onRightPress}>
        {rightIcon ? rightIcon : <MessageSquarePlus color={theme.text} size={28} />}
      </TouchableOpacity>
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
    marginTop: 20,
    marginBottom: 10,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc', // Visible fallback color
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold' },
});