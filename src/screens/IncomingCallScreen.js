import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { Phone, PhoneOff, User } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';

export default function IncomingCallScreen({ contact, onAccept, onDecline, mode }) {
    const theme = useTheme(mode);
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.2,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [pulseAnim]);

    return (
        <View style={[styles.container, { backgroundColor: mode === 'dark' ? '#000' : '#f0f0f0' }]}>
            {/* Background Background Image/Blur Effect */}
            <View style={styles.backgroundContainer}>
                {contact?.image ? (
                    <Image source={{ uri: contact.image }} style={styles.backgroundImage} blurRadius={20} />
                ) : (
                    <View style={[styles.backgroundImage, { backgroundColor: mode === 'dark' ? '#1a1a1a' : '#e0e0e0' }]} />
                )}
                <View style={[styles.overlay, { backgroundColor: mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)' }]} />
            </View>

            <SafeAreaView style={styles.content}>
                {/* Contact Info */}
                <View style={styles.header}>
                    <Text style={[styles.incomingText, { color: theme.textSecondary }]}>Incoming Voice Call</Text>
                    <View style={[styles.avatarContainer, { borderColor: mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)' }]}>
                        {contact?.image ? (
                            <Image source={{ uri: contact.image }} style={styles.avatar} />
                        ) : (
                            <User size={80} color={theme.text} />
                        )}
                    </View>
                    <Text style={[styles.name, { color: theme.text }]}>{contact?.name || 'Unknown Caller'}</Text>
                </View>

                {/* Actions */}
                <View style={styles.actionsContainer}>
                    <View style={styles.actionItem}>
                        <TouchableOpacity onPress={onDecline} style={[styles.button, styles.declineButton]}>
                            <PhoneOff size={32} color="#fff" />
                        </TouchableOpacity>
                        <Text style={[styles.actionLabel, { color: theme.text }]}>Decline</Text>
                    </View>

                    <View style={styles.actionItem}>
                        <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                            <TouchableOpacity onPress={onAccept} style={[styles.button, styles.acceptButton]}>
                                <Phone size={32} color="#fff" />
                            </TouchableOpacity>
                        </Animated.View>
                        <Text style={[styles.actionLabel, { color: theme.text }]}>Accept</Text>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundContainer: {
        ...StyleSheet.absoluteFillObject,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        opacity: 0.5,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 80,
    },
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
    avatarContainer: {
        width: 140,
        height: 140,
        borderRadius: 70,
        overflow: 'hidden',
        borderWidth: 2,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 40,
        marginBottom: 40,
    },
    actionItem: {
        alignItems: 'center',
    },
    button: {
        width: 75,
        height: 75,
        borderRadius: 37.5,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    declineButton: {
        backgroundColor: '#FF3B30',
    },
    acceptButton: {
        backgroundColor: '#34C759',
    },
    actionLabel: {
        marginTop: 15,
        fontSize: 14,
        fontWeight: '500',
    },
});
