import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { User } from 'lucide-react-native';
import { GlobalStyles } from '../constants/globalStyles';

export default function CallHeader({ contact, status, theme, mode }) {
    const isDark = mode === 'dark';

    return (
        <View style={styles.header}>
            {status && status.includes('Incoming') && (
                <Text style={[styles.incomingText, { color: theme.textSecondary }]}>{status}</Text>
            )}
            <View style={[styles.avatarContainer, { borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' }]}>
                {contact?.image ? (
                    <Image source={{ uri: contact.image }} style={styles.avatar} />
                ) : (
                    <User size={80} color={theme.text} />
                )}
            </View>
            <Text style={[styles.name, { color: theme.text }]}>{contact?.name || 'Unknown'}</Text>
            {status && !status.includes('Incoming') && (
                <Text style={[styles.status, { color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)' }]}>{status}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        marginTop: 40,
    },
    incomingText: {
        fontSize: 16,
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginBottom: 30,
    },
    avatarContainer: GlobalStyles.callAvatarContainer,
    avatar: {
        width: '100%',
        height: '100%',
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    status: {
        fontSize: 18,
        letterSpacing: 1,
        marginTop: 10,
    },
});
