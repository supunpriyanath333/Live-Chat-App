import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { PhoneIncoming, PhoneOutgoing, PhoneMissed, Phone, Video, MessageSquare } from 'lucide-react-native';
import { GlobalStyles } from '../constants/globalStyles';

export default function CallCard({ item, theme }) {
    const getIcon = () => {
        switch (item.type) {
            case 'incoming': return <PhoneIncoming size={16} color="#00b894" />; // Green
            case 'outgoing': return <PhoneOutgoing size={16} color="#1e48c7ff" />; // Gray
            case 'missed': return <PhoneMissed size={16} color="#FF453A" />; // Red
            default: return <Phone size={16} color={theme.secondaryText} />;
        }
    };

    return (
        <View style={styles.card}>
            <TouchableOpacity style={styles.infoContainer}>
                <Image source={{ uri: item.image }} style={[styles.avatar, { borderColor: theme.theirAvatarBorder }]} />
                <View style={styles.textContainer}>
                    <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>
                    <View style={styles.metaContainer}>
                        {getIcon()}
                        <Text style={[styles.time, { color: theme.secondaryText }]}>{item.time}</Text>
                    </View>
                </View>
            </TouchableOpacity>

            <View style={styles.actions}>
                <TouchableOpacity style={GlobalStyles.actionBtn}>
                    <Phone size={20} color={theme.primary} />
                </TouchableOpacity>
                <TouchableOpacity style={GlobalStyles.actionBtn}>
                    <Video size={20} color={theme.primary} />
                </TouchableOpacity>
                <TouchableOpacity style={GlobalStyles.actionBtn}>
                    <MessageSquare size={20} color={theme.primary} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
        paddingHorizontal: 5,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatar: {
        ...GlobalStyles.avatar,
        ...GlobalStyles.avatarCall,
    },
    textContainer: {
        marginLeft: 15,
    },
    name: {
        fontSize: 17,
        fontWeight: '600',
        marginBottom: 6,
        letterSpacing: 0.3,
    },
    metaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    time: {
        fontSize: 13,
        fontWeight: '500',
    },
    actions: {
        flexDirection: 'row',
        gap: 15, // Space between action buttons
    },
});
