import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, Check } from 'lucide-react-native';
import { useTheme } from '../hooks/useTheme';
import { GlobalStyles } from '../constants/globalStyles';

export default function ProfileSetupScreen({ onComplete, mode }) {
    const theme = useTheme(mode);
    const [name, setName] = useState('');

    // Default placeholder avatar
    const [avatar, setAvatar] = useState('https://i.pravatar.cc/150?u=my_new_profile');

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.content}
            >
                <View style={styles.header}>
                    <Text style={[styles.title, { color: theme.text }]}>Setup Profile</Text>
                    <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
                        How would you like to be seen by others?
                    </Text>
                </View>

                <View style={styles.avatarContainer}>
                    <View style={[
                        styles.avatarWrapper,
                        { borderColor: theme.myAvatarBorder, borderWidth: 2 }
                    ]}>
                        <Image source={{ uri: avatar }} style={styles.avatar} />
                        <TouchableOpacity
                            style={[styles.cameraButton, { backgroundColor: theme.primary }]}
                            activeOpacity={0.8}
                        >
                            <Camera size={20} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[
                    styles.inputContainer,
                    {
                        backgroundColor: theme.surface,
                        borderColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                        borderWidth: 1
                    }
                ]}>
                    <Text style={[styles.label, { color: theme.secondaryText }]}>YOUR NAME</Text>
                    <TextInput
                        style={[styles.input, { color: theme.text, borderBottomColor: theme.primary }]}
                        placeholder="Enter your name"
                        placeholderTextColor={theme.secondaryText}
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                <TouchableOpacity
                    style={[
                        styles.doneButton,
                        { backgroundColor: name ? theme.primary : theme.secondaryText + '40' }
                    ]}
                    onPress={() => onComplete({ name, avatar })}
                    disabled={!name}
                >
                    <Text style={styles.doneButtonText}>Finish Setup</Text>
                    <Check size={20} color="#FFF" />
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
        paddingTop: 40,
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
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 50,
    },
    avatarWrapper: {
        position: 'relative',
        ...GlobalStyles.avatarLarge,
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 60,
    },
    cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#050a08',
    },
    inputContainer: {
        padding: 25,
        borderRadius: 30,
        marginBottom: 40,
    },
    label: {
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 1,
        marginBottom: 10,
    },
    input: {
        fontSize: 18,
        fontWeight: '600',
        paddingVertical: 10,
        borderBottomWidth: 2,
    },
    doneButton: {
        height: 60,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        marginTop: 'auto',
        marginBottom: 30,
    },
    doneButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
