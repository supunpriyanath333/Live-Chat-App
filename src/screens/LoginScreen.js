import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, ArrowRight } from 'lucide-react-native';
import { useTheme } from '../hooks/useTheme';
import PrimaryButton from '../components/PrimaryButton';

export default function LoginScreen({ onSendOTP, mode }) {
    const theme = useTheme(mode);
    const [email, setEmail] = useState('');

    const isDark = mode === 'dark';

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.content}
            >
                <View style={styles.mainContent}>
                    <View style={styles.topContainer}>
                        <View style={styles.topSection}>
                            <Text style={[styles.welcomeText, { color: theme.text }]}>WELCOME !</Text>
                        </View>

                        <View style={styles.brandingSection}>
                            <Image
                                source={require('../../assets/applogo.png')}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                        </View>
                    </View>

                    <View style={[
                        styles.formContainer,
                        {
                            borderColor: theme.border,
                            backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'
                        }
                    ]}>
                        <Text style={[styles.instructionText, { color: theme.text }]}>
                            Enter Your Email Address To Login To{"\n"}ChatNet
                        </Text>

                        <View style={[
                            styles.inputWrapper,
                            { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }
                        ]}>
                            <TextInput
                                style={[styles.input, { color: theme.text }]}
                                placeholder="Enter your email"
                                placeholderTextColor={theme.secondaryText}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            <Mail size={20} color={theme.primary} style={styles.inputIcon} />
                        </View>
                    </View>
                </View>

                <View style={styles.footerSection}>
                    <PrimaryButton
                        title="Continue"
                        onPress={() => onSendOTP(email)}
                        disabled={!email.trim()}
                        icon={<ArrowRight size={22} color="#FFF" />}
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
        paddingTop: 120,
    },
    mainContent: {
        flex: 1,
        width: '100%',
        gap: 30,
    },
    topContainer: {
        alignItems: 'center',
        gap: 20,
    },
    topSection: {
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    brandingSection: {
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 100,
    },
    brandChat: {
        fontSize: 34,
        fontWeight: 'bold',
    },
    brandNet: {
        fontSize: 34,
        fontWeight: 'bold',
        opacity: 0.8,
    },
    formContainer: {
        borderWidth: 1,
        borderRadius: 15,
        padding: 25,
        width: '100%',
        alignItems: 'center',
        gap: 20,
    },
    instructionText: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: 20,
        letterSpacing: 0.5,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        paddingHorizontal: 15,
        height: 55,
        width: '100%',
        borderWidth: 1,
        borderColor: 'rgba(222, 219, 219, 0.51)',
    },
    input: {
        flex: 1,
        fontSize: 14,
        fontWeight: '500',
    },
    inputIcon: {
        marginLeft: 10,
    },
    footerSection: {
        width: '100%',
        paddingBottom: 40,
    },
});
