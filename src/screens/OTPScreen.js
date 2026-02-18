import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, RefreshCw } from 'lucide-react-native';
import { useTheme } from '../hooks/useTheme';
import PrimaryButton from '../components/PrimaryButton';

export default function OTPScreen({ email, onVerify, onBack, mode }) {
    const theme = useTheme(mode);
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

    const isDark = mode === 'dark';

    const handleChange = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // Auto-focus next input
        if (text && index < 3) {
            inputRefs[index + 1].current.focus();
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs[index - 1].current.focus();
        }
    };

    const isOtpFilled = otp.every(digit => digit !== '');

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.content}
            >
                <View style={styles.mainContent}>
                    <TouchableOpacity onPress={onBack} style={styles.backButton}>
                        <ArrowLeft size={28} color={theme.text} />
                    </TouchableOpacity>

                    <View style={styles.topSection}>
                        <Text style={[styles.welcomeText, { color: theme.text }]}>Verify Your Email</Text>
                    </View>

                    <View style={[
                        styles.formContainer,
                        {
                            borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                            backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'
                        }
                    ]}>
                        <Text style={[styles.instructionText, { color: theme.text }]}>
                            We have sent a 4 digit code to your Email{"\n"}
                            <Text style={styles.emailText}>"{email}"</Text>
                        </Text>

                        <View style={styles.otpContainer}>
                            {otp.map((digit, i) => (
                                <View key={i} style={[
                                    styles.otpBox,
                                    {
                                        backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
                                        borderColor: digit ? theme.primary : (isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)')
                                    }
                                ]}>
                                    <TextInput
                                        ref={inputRefs[i]}
                                        style={[styles.otpInput, { color: theme.text }]}
                                        keyboardType="number-pad"
                                        maxLength={1}
                                        value={digit}
                                        onChangeText={(text) => handleChange(text, i)}
                                        onKeyPress={(e) => handleKeyPress(e, i)}
                                    />
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={styles.resendSection}>
                        <TouchableOpacity style={styles.resendButton}>
                            <RefreshCw size={18} color={theme.primary} style={{ marginRight: 8 }} />
                            <Text style={[styles.resendText, { color: theme.primary }]}>Resend Code</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.footerSection}>
                    <PrimaryButton
                        title="Verify Now"
                        onPress={() => onVerify(otp.join(''))}
                        disabled={!isOtpFilled}
                        theme={theme}
                    />
                </View>
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
        paddingHorizontal: 30,
        paddingTop: 20,
    },
    mainContent: {
        flex: 1,
        width: '100%',
    },
    backButton: {
        marginTop: 10,
        marginBottom: 30,
    },
    topSection: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 30,
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: 'bold',
        letterSpacing: 1,
        textAlign: 'center',
    },
    formContainer: {
        borderWidth: 1,
        borderRadius: 15,
        padding: 25,
        width: '100%',
        alignItems: 'center',
        gap: 30,
        marginBottom: 15,
    },
    instructionText: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: 22,
        letterSpacing: 0.5,
    },
    emailText: {
        fontWeight: 'italic',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 15,
        width: '100%',
    },
    otpBox: {
        width: 60,
        height: 60,
        borderRadius: 18,
        borderWidth: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    otpInput: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        width: '100%',
        height: '100%',
    },
    resendSection: {
        alignItems: 'flex-end',
        width: '100%',
        marginTop: 10,
    },
    resendButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    resendText: {
        fontSize: 16,
        fontWeight: '600',
    },
    footerSection: {
        width: '100%',
        paddingBottom: 40,
    },
});
