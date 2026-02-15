// components/ChatCard.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { CheckCheck } from 'lucide-react-native';
// Fixed the import path to properly point to the hook
import { useTheme } from '../hooks/useTheme';
import { GlobalStyles } from '../constants/globalStyles';

export default function ChatCard({ item, mode }) {
  // Pass 'mode' into useTheme so the colors react to your toggle
  const theme = useTheme(mode);

  return (
    <View style={styles.card}>
      <View>
        <Image source={{ uri: item.image }} style={[styles.avatar, { borderColor: theme.theirAvatarBorder }]} />
        {item.online && <View style={[styles.onlineDot, { borderColor: theme.surface }]} />}
      </View>

      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>
          <Text style={[styles.time, { color: theme.secondaryText }]}>{item.time}</Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.message, { color: theme.secondaryText }]} numberOfLines={1}>
            {item.message}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {item.isMe && (
              <CheckCheck
                size={16}
                color={item.status === 'seen' ? theme.primary : theme.secondaryText}
                style={{ marginLeft: 10 }}
              />
            )}
            {item.unread > 0 && (
              <View style={[styles.badge, { backgroundColor: theme.primary, marginLeft: 10 }]}>
                <Text style={styles.badgeText}>{item.unread}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20, alignItems: 'center' },
  avatar: { ...GlobalStyles.avatar, ...GlobalStyles.avatarLarge },
  onlineDot: {
    position: 'absolute', bottom: 2, right: 2,
    width: 14, height: 14, borderRadius: 7,
    backgroundColor: '#00b894', borderWidth: 2
  },
  content: { flex: 1, marginLeft: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 17, fontWeight: 'bold' },
  time: { fontSize: 12 },
  message: { fontSize: 14, marginTop: 4, flex: 1 },
  badge: { minWidth: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5 },
  badgeText: { color: 'white', fontSize: 11, fontWeight: 'bold' },
});