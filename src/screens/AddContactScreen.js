import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search, UserPlus, CheckCircle2, XCircle } from 'lucide-react-native';
import { useTheme } from '../hooks/useTheme';
import { GlobalStyles } from '../constants/globalStyles';

// Mock function to simulate a user search
const mockSearchUser = (email) => {
    const users = {
        'test@email.com': { id: '10', name: 'James Wilson', image: 'https://i.pravatar.cc/150?u=10' },
        'hello@chathub.com': { id: '11', name: 'Sarah Chen', image: 'https://i.pravatar.cc/150?u=11' },
    };
    return users[email.toLowerCase()] || null;
};

export default function AddContactScreen({ onBack, onAdd, mode, userAvatar }) {
    const theme = useTheme(mode);
    const [email, setEmail] = useState('');
    const [foundUser, setFoundUser] = useState(null);
    const [nickname, setNickname] = useState('');
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = () => {
        if (!email.trim()) return;
        const result = mockSearchUser(email);
        setFoundUser(result);
        if (result) setNickname(result.name); // Default nickname to их full name
        setHasSearched(true);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <View style={styles.header}>
                    <TouchableOpacity onPress={onBack} style={styles.backButton}>
                        <ArrowLeft size={24} color={theme.text} />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: theme.text }]}>Add Contact</Text>
                </View>

                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.searchSection}>
                        <Text style={[styles.label, { color: theme.secondaryText }]}>FIND BY EMAIL</Text>
                        <View style={[
                            styles.inputWrapper,
                            {
                                backgroundColor: theme.surface,
                                borderColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                                borderWidth: 1
                            }
                        ]}>
                            <TextInput
                                style={[styles.input, { color: theme.text }]}
                                placeholder="user@email.com"
                                placeholderTextColor={theme.secondaryText}
                                value={email}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    setHasSearched(false);
                                }}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            <TouchableOpacity
                                style={[styles.searchBtn, { backgroundColor: theme.primary }]}
                                onPress={handleSearch}
                            >
                                <Search size={20} color="#FFF" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {hasSearched && (
                        <View style={styles.resultSection}>
                            {foundUser ? (
                                <View style={[
                                    styles.resultCard,
                                    {
                                        backgroundColor: theme.surface,
                                        borderColor: theme.primary + '30',
                                        borderWidth: 1
                                    }
                                ]}>
                                    <View style={styles.userInfo}>
                                        <View style={[styles.avatarWrapper, { borderColor: theme.theirAvatarBorder }]}>
                                            <Image source={{ uri: foundUser.image }} style={styles.avatar} />
                                        </View>
                                        <View style={styles.userText}>
                                            <Text style={[styles.userName, { color: theme.text }]}>{foundUser.name}</Text>
                                            <Text style={[styles.userEmail, { color: theme.secondaryText }]}>{email}</Text>
                                        </View>
                                        <CheckCircle2 size={24} color={theme.primary} />
                                    </View>

                                    <View style={styles.nicknameSection}>
                                        <Text style={[styles.label, { color: theme.secondaryText }]}>PREFERRED NAME</Text>
                                        <TextInput
                                            style={[
                                                styles.nicknameInput,
                                                { color: theme.text, borderBottomColor: theme.primary }
                                            ]}
                                            value={nickname}
                                            onChangeText={setNickname}
                                            placeholder="e.g. My Bestie"
                                            placeholderTextColor={theme.secondaryText}
                                        />
                                    </View>

                                    <TouchableOpacity
                                        style={[styles.addBtn, { backgroundColor: theme.primary }]}
                                        onPress={() => onAdd({ ...foundUser, nickname })}
                                    >
                                        <UserPlus size={20} color="#FFF" style={{ marginRight: 10 }} />
                                        <Text style={styles.addBtnText}>Save Contact</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View style={styles.notFound}>
                                    <XCircle size={48} color={theme.secondaryText} style={{ marginBottom: 15 }} />
                                    <Text style={[styles.notFoundText, { color: theme.text }]}>No user found with this email</Text>
                                    <Text style={[styles.notFoundSub, { color: theme.secondaryText }]}>Double check the email address and try again.</Text>
                                </View>
                            )}
                        </View>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    backButton: {
        marginRight: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        padding: 25,
    },
    searchSection: {
        marginBottom: 30,
    },
    label: {
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 1,
        marginBottom: 12,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        paddingLeft: 20,
        height: 60,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    },
    input: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
    },
    searchBtn: {
        width: 60,
        height: 60,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    resultSection: {
        marginTop: 10,
    },
    resultCard: {
        borderRadius: 30,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 5,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },
    avatarWrapper: {
        ...GlobalStyles.avatar,
        ...GlobalStyles.avatarMedium,
        borderWidth: 2,
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    userText: {
        flex: 1,
        marginLeft: 15,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    userEmail: {
        fontSize: 14,
        marginTop: 2,
    },
    nicknameSection: {
        marginBottom: 30,
    },
    nicknameInput: {
        fontSize: 18,
        fontWeight: '600',
        paddingVertical: 10,
        borderBottomWidth: 2,
    },
    addBtn: {
        height: 55,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addBtnText: {
        color: '#FFF',
        fontSize: 17,
        fontWeight: 'bold',
    },
    notFound: {
        alignItems: 'center',
        marginTop: 40,
    },
    notFoundText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    notFoundSub: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 8,
        lineHeight: 20,
    },
});
