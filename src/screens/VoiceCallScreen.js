import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, BlurView } from 'react-native';
import { PhoneOff, Mic, MicOff, Volume2, VolumeX, User } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { GlobalStyles } from '../constants/globalStyles';

export default function VoiceCallScreen({ contact, onEndCall, mode }) {
    const theme = useTheme(mode);
    const [isMuted, setIsMuted] = useState(false);
    const [isSpeaker, setIsSpeaker] = useState(false);
    const [callDuration, setCallDuration] = useState(0);
    const [status, setStatus] = useState('Ringing...');

    useEffect(() => {
        // Simulate call connecting after 3 seconds
        const connectTimer = setTimeout(() => {
            setStatus('00:00');
        }, 3000);

        return () => clearTimeout(connectTimer);
    }, []);

    useEffect(() => {
        let interval;
        if (status !== 'Ringing...') {
            interval = setInterval(() => {
                setCallDuration(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [status]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const displayTime = status === 'Ringing...' ? status : formatTime(callDuration);

    return (
        <View style={styles.container}>
            {/* Background Image/Blur Effect */}
            <View style={styles.backgroundContainer}>
                {contact?.image ? (
                    <Image source={{ uri: contact.image }} style={styles.backgroundImage} blurRadius={10} />
                ) : (
                    <View style={[styles.backgroundImage, { backgroundColor: '#1a1a1a' }]} />
                )}
                <View style={styles.overlay} />
            </View>

            <SafeAreaView style={styles.content}>
                {/* Contact Info */}
                <View style={styles.header}>
                    <View style={[styles.avatarContainer, { borderColor: 'rgba(255,255,255,0.2)' }]}>
                        {contact?.image ? (
                            <Image source={{ uri: contact.image }} style={styles.avatar} />
                        ) : (
                            <User size={60} color="#fff" />
                        )}
                    </View>
                    <Text style={styles.name}>{contact?.name || 'Unknown'}</Text>
                    <Text style={styles.status}>{displayTime}</Text>
                </View>

                {/* Controls Area */}
                <View style={styles.controlsContainer}>
                    <View style={styles.row}>
                        <TouchableOpacity
                            onPress={() => setIsMuted(!isMuted)}
                            style={[styles.controlBtn, isMuted && styles.activeControlBtn]}
                        >
                            {isMuted ? <MicOff size={28} color="#fff" /> : <Mic size={28} color="#fff" />}
                            <Text style={styles.controlLabel}>Mute</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setIsSpeaker(!isSpeaker)}
                            style={[styles.controlBtn, isSpeaker && styles.activeControlBtn]}
                        >
                            {isSpeaker ? <Volume2 size={28} color="#fff" /> : <VolumeX size={28} color="#fff" />}
                            <Text style={styles.controlLabel}>Speaker</Text>
                        </TouchableOpacity>
                    </View>

                    {/* End Call Button */}
                    <TouchableOpacity onPress={onEndCall} style={styles.endCallBtn}>
                        <PhoneOff size={32} color="#fff" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    backgroundContainer: {
        ...StyleSheet.absoluteFillObject,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        opacity: 0.4,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 60,
    },
    header: {
        alignItems: 'center',
        marginTop: 40,
    },
    avatarContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        overflow: 'hidden',
        borderWidth: 2,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    status: {
        fontSize: 18,
        color: 'rgba(255,255,255,0.7)',
        letterSpacing: 1,
    },
    controlsContainer: {
        width: '100%',
        alignItems: 'center',
        paddingBottom: 40,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 60,
        marginBottom: 60,
    },
    controlBtn: {
        alignItems: 'center',
        width: 70,
    },
    activeControlBtn: {
        opacity: 0.5,
    },
    controlLabel: {
        color: '#fff',
        marginTop: 10,
        fontSize: 14,
    },
    endCallBtn: {
        width: 75,
        height: 75,
        borderRadius: 37.5,
        backgroundColor: '#FF3B30',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
});
