import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, ArrowRight } from 'lucide-react-native';
import { useTheme } from '../hooks/useTheme';
import PrimaryButton from '../components/PrimaryButton';

export default function ProfileSetupScreen({ onComplete, mode }) {
    const theme = useTheme(mode);
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [avatar, setAvatar] = useState('https://i.pravatar.cc/150?u=my_new_profile');

    const isDark = mode === 'dark';

    const handleBioChange = (text) => {
        if (text.length <= 50) {
            setBio(text);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.content}
            >
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.topSection}>
                        <Text style={[styles.welcomeText, { color: theme.text }]}>Hii..!</Text>
                        <Text style={[styles.subtitle, { color: theme.text }]}>
                            It looks like you are a new user to ChatNet.{"\n"}
                            Set up your profile the way you want{"\n"}
                            others to see you.
                        </Text>
                    </View>

                    <View style={[
                        styles.formContainer,
                        {
                            borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                            backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'
                        }
                    ]}>
                        <View style={styles.avatarContainer}>
                            <View style={[styles.avatarWrapper, { borderColor: theme.primary, borderWidth: 1 }]}>
                                <Image source={{ uri: avatar }} style={styles.avatar} />
                                <TouchableOpacity
                                    style={[styles.cameraButton, { backgroundColor: theme.primary }]}
                                    activeOpacity={0.8}
                                >
                                    <Camera size={18} color="#FFF" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, { color: theme.text }]}>Your Name</Text>
                            <View style={[
                                styles.inputWrapper,
                                { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }
                            ]}>
                                <TextInput
                                    style={[styles.input, { color: theme.text }]}
                                    placeholder="Enter your name"
                                    placeholderTextColor={theme.secondaryText}
                                    value={name}
                                    onChangeText={setName}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, { color: theme.text }]}>Something About You</Text>
                            <View style={[
                                styles.bioWrapper,
                                { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }
                            ]}>
                                <TextInput
                                    style={[styles.bioInput, { color: theme.text }]}
                                    placeholder="Hii.. i am a Designer.."
                                    placeholderTextColor={theme.secondaryText}
                                    value={bio}
                                    onChangeText={handleBioChange}
                                    multiline
                                    maxLength={50}
                                />
                                <Text style={[styles.charCount, { color: theme.secondaryText }]}>
                                    {bio.length}/50
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.footerSection}>
                    <PrimaryButton
                        title="Continue"
                        onPress={() => onComplete({ name, avatar, bio })}
                        disabled={!name.trim()}
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
        paddingTop: 40,
    },
    scrollContent: {
        paddingVertical: 60,
    },
    topSection: {
        alignItems: 'center',
        marginBottom: 30,
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        letterSpacing: 1,
    },
    subtitle: {
        fontSize: 14,
        lineHeight: 22,
        textAlign: 'center',
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    formContainer: {
        borderWidth: 1,
        borderRadius: 15,
        padding: 25,
        width: '100%',
        gap: 25,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    avatarWrapper: {
        position: 'relative',
        width: 130,
        height: 130,
        borderRadius: 65,
        padding: 2,
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 65,
        backgroundColor: '#CCC',
    },
    cameraButton: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        width: 34,
        height: 34,
        borderRadius: 17,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#050a08',
    },
    inputGroup: {
        gap: 10,
    },
    label: {
        fontSize: 14,
        fontWeight: '700',
        marginLeft: 5,
    },
    inputWrapper: {
        borderRadius: 18,
        paddingHorizontal: 15,
        height: 55,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    input: {
        fontSize: 14,
        fontWeight: '500',
    },
    bioWrapper: {
        borderRadius: 18,
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 10,
        minHeight: 100,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    bioInput: {
        fontSize: 14,
        fontWeight: '500',
        textAlignVertical: 'top',
        flex: 1,
    },
    charCount: {
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'right',
        marginTop: 5,
    },
    footerSection: {
        width: '100%',
        paddingBottom: 40,
    },
});
