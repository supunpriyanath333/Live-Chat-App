import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { PhoneOff, Mic, MicOff, Camera, CameraOff, SwitchCamera, User } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { GlobalStyles } from '../constants/globalStyles';
import CallHeader from '../components/CallHeader';
import CallControl from '../components/CallControl';

const { width, height } = Dimensions.get('window');

export default function VideoCallScreen({ contact, onEndCall, mode }) {
    const theme = useTheme(mode);
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [callDuration, setCallDuration] = useState(0);
    const [status, setStatus] = useState('Calling...');

    useEffect(() => {
        const connectTimer = setTimeout(() => {
            setStatus('00:00');
        }, 3000);
        return () => clearTimeout(connectTimer);
    }, []);

    useEffect(() => {
        let interval;
        if (status !== 'Calling...') {
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

    const displayTime = status === 'Calling...' ? status : formatTime(callDuration);

    return (
        <View style={styles.container}>
            {/* Background "Video" (Contact Image) */}
            <View style={styles.remoteVideoContainer}>
                {contact?.image ? (
                    <Image source={{ uri: contact.image }} style={styles.remoteVideo} resizeMode="cover" />
                ) : (
                    <View style={styles.placeholderVideo}>
                        <User size={100} color="#555" />
                    </View>
                )}
                <View style={styles.overlay} />
            </View>

            {/* Local Video Preview (Floating) */}
            <View style={styles.localVideoContainer}>
                {isVideoOff ? (
                    <View style={styles.localVideoOff}>
                        <CameraOff size={24} color="#fff" />
                    </View>
                ) : (
                    <Image source={{ uri: 'https://i.pravatar.cc/150?u=me' }} style={styles.localVideo} />
                )}
            </View>

            <SafeAreaView style={styles.uiOverlay}>
                {/* Header Info */}
                <CallHeader
                    contact={contact}
                    status={displayTime}
                    theme={theme}
                    mode={mode}
                />

                {/* Bottom Controls */}
                <View style={styles.controlsBar}>
                    <CallControl
                        onPress={() => { }}
                        icon={SwitchCamera}
                        backgroundColor="rgba(255,255,255,0.2)"
                    />

                    <CallControl
                        onPress={() => setIsVideoOff(!isVideoOff)}
                        icon={isVideoOff ? CameraOff : Camera}
                        backgroundColor={isVideoOff ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)'}
                    />

                    <CallControl
                        onPress={() => setIsMuted(!isMuted)}
                        icon={isMuted ? MicOff : Mic}
                        backgroundColor={isMuted ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)'}
                    />

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
    remoteVideoContainer: {
        ...StyleSheet.absoluteFillObject,
    },
    remoteVideo: {
        width: '100%',
        height: '100%',
    },
    placeholderVideo: {
        flex: 1,
        backgroundColor: '#222',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    localVideoContainer: {
        position: 'absolute',
        top: 60,
        right: 20,
        width: 100,
        height: 150,
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.3)',
        backgroundColor: '#333',
        zIndex: 10,
    },
    localVideo: {
        width: '100%',
        height: '100%',
    },
    localVideoOff: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    uiOverlay: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 40,
    },
    controlsBar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        marginHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 40,
        marginBottom: 20,
    },
});
