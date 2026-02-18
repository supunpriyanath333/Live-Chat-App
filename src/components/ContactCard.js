import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MessageSquare, Phone, Video } from 'lucide-react-native';
import { GlobalStyles } from '../constants/globalStyles';

export default function ContactCard({ item, theme, onMessage, onPhone, onVideo, onVideoCall }) {
    return (
        <View style={styles.card}>
            <View style={[styles.avatarContainer, { borderColor: theme.theirAvatarBorder }]}>
                <Image source={{ uri: item.image }} style={styles.avatar} />
            </View>

            <View style={styles.info}>
                <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>
                <Text style={[styles.status, { color: theme.secondaryText }]} numberOfLines={1}>
                    {item.status || 'Hey there! I am using ChatHub.'}
                </Text>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity onPress={() => onMessage?.(item)} style={GlobalStyles.actionBtn}>
                    <MessageSquare size={20} color={theme.primary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onPhone?.(item)} style={GlobalStyles.actionBtn}>
                    <Phone size={20} color={theme.primary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onVideoCall?.(item)} style={GlobalStyles.actionBtn}>
                    <Video size={20} color={theme.primary} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        marginBottom: 8,
    },
    avatarContainer: {
        position: 'relative',
        ...GlobalStyles.avatar,
        ...GlobalStyles.avatarMedium,
        overflow: 'hidden',
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    info: {
        flex: 1,
        marginLeft: 15,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    status: {
        fontSize: 13,
        marginTop: 2,
    },
    actions: {
        flexDirection: 'row',
        gap: 12,
    },
});
