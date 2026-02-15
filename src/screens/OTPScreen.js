import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, RefreshCw } from 'lucide-react-native';
import { useTheme } from '../hooks/useTheme';

export default function OTPScreen({ email, onVerify, onBack, mode }) {
    const theme = useTheme(mode);
    const [otp, setOtp] = useState(['', '', '', '']);

    const handleChange = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // Auto-focus next input
        if (text && index < 3) {
            // In a real app, you'd use refs here
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.content}
            >
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <ArrowLeft size={24} color={theme.text} />
                </TouchableOpacity>

                <View style={styles.header}>
                    <Text style={[styles.title, { color: theme.text }]}>Verify Email</Text>
                    <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
                        We've sent a 4-digit code to {email}
                    </Text>
                </View>

                <View style={styles.otpContainer}>
                    {otp.map((digit, i) => (
                        <View key={i} style={[
                            styles.otpBox,
                            {
                                backgroundColor: theme.surface,
                                borderColor: digit ? theme.primary : (mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)')
                            }
                        ]}>
                            <TextInput
                                style={[styles.otpInput, { color: theme.text }]}
                                keyboardType="number-pad"
                                maxLength={1}
                                value={digit}
                                onChangeText={(text) => handleChange(text, i)}
                            />
                        </View>
                    ))}
                </View>

                <TouchableOpacity
                    style={[styles.verifyButton, { backgroundColor: theme.primary }]}
                    onPress={() => onVerify(otp.join(''))}
                >
                    <Text style={styles.verifyButtonText}>Verify Now</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.resendButton}>
                    <RefreshCw size={16} color={theme.primary} style={{ marginRight: 8 }} />
                    <Text style={[styles.resendText, { color: theme.primary }]}>Resend Code</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 25,
    },
    backButton: {
        marginTop: 20,
        marginBottom: 40,
    },
    header: {
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 24,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
    },
    otpBox: {
        width: 65,
        height: 75,
        borderRadius: 15,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    otpInput: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        width: '100%',
    },
    verifyButton: {
        height: 55,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    verifyButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    resendButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    resendText: {
        fontSize: 16,
        fontWeight: '600',
    }
});
