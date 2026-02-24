import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { PhoneOff, Mic, MicOff, Volume2, VolumeX } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { GlobalStyles } from '../constants/globalStyles';
import CallHeader from '../components/CallHeader';
import CallControl from '../components/CallControl';

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
                <CallHeader
                    contact={contact}
                    status={displayTime}
                    theme={theme}
                    mode={mode}
                />

                {/* Controls Area */}
                <View style={styles.controlsContainer}>
                    <View style={styles.row}>
                        <CallControl
                            onPress={() => setIsMuted(!isMuted)}
                            icon={isMuted ? MicOff : Mic}
                            label="Mute"
                            backgroundColor={isMuted ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)'}
                        />

                        <CallControl
                            onPress={() => setIsSpeaker(!isSpeaker)}
                            icon={isSpeaker ? Volume2 : VolumeX}
                            label="Speaker"
                            backgroundColor={isSpeaker ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)'}
                        />
                    </View>

                    {/* End Call Button */}
                    <CallControl
                        onPress={onEndCall}
                        icon={PhoneOff}
                        backgroundColor={GlobalStyles.call.end}
                    />
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
});
