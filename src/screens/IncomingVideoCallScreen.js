import { Video, PhoneOff } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { GlobalStyles } from '../constants/globalStyles';
import CallHeader from '../components/CallHeader';
import CallControl from '../components/CallControl';

export default function IncomingVideoCallScreen({ contact, onAccept, onDecline, mode }) {
    const theme = useTheme(mode);

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
                <CallHeader
                    contact={contact}
                    status="Incoming Video Call"
                    theme={theme}
                    mode={mode}
                />

                {/* Actions */}
                <View style={styles.actionsContainer}>
                    <CallControl
                        onPress={onDecline}
                        icon={PhoneOff}
                        label="Decline"
                        backgroundColor={GlobalStyles.call.decline}
                        textColor={theme.text}
                    />

                    <CallControl
                        onPress={onAccept}
                        icon={Video}
                        label="Accept"
                        backgroundColor={GlobalStyles.call.accept}
                        isPulsing={true}
                        textColor={theme.text}
                    />
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
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 40,
        marginBottom: 40,
    },
});
