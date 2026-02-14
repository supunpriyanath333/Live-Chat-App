import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { PhoneIncoming, PhoneOutgoing, PhoneMissed, Phone, Video, MessageSquare } from 'lucide-react-native';

export default function CallCard({ item, theme }) {
    const getIcon = () => {
        switch (item.type) {
            case 'incoming': return <PhoneIncoming size={16} color="#00b894" />; // Green
            case 'outgoing': return <PhoneOutgoing size={16} color={theme.secondaryText} />; // Gray
            case 'missed': return <PhoneMissed size={16} color="#FF453A" />; // Red
            default: return <Phone size={16} color={theme.secondaryText} />;
        }
    };

    return (
        <View style={styles.card}>
            <TouchableOpacity style={styles.infoContainer}>
                <Image source={{ uri: item.image }} style={styles.avatar} />
                <View style={styles.textContainer}>
                    <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>
                    <View style={styles.metaContainer}>
                        {getIcon()}
                        <Text style={[styles.time, { color: theme.secondaryText }]}>{item.time}</Text>
                    </View>
                </View>
            </TouchableOpacity>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.actionBtn}>
                    <Phone size={22} color={theme.secondaryText} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                    <Video size={22} color={theme.secondaryText} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                    <MessageSquare size={22} color={theme.secondaryText} />
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
        width: 55,
        height: 55,
        borderRadius: 27.5,
        borderWidth: 1,
        borderColor: '#333', // Subtle border for dark mode
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
    actionBtn: {
        padding: 5,
    }
});
