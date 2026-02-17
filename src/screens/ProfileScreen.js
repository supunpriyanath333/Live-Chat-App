import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Edit3, Settings, LogOut, Shield, Bell, HelpCircle } from 'lucide-react-native';
import { useTheme } from '../hooks/useTheme';

export default function ProfileScreen({ user, onBack, onLogout, mode }) {
    const theme = useTheme(mode);
    const isDark = mode === 'dark';

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <ArrowLeft size={28} color={theme.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: theme.text }]}>Profile</Text>
                <TouchableOpacity style={styles.editButton}>
                    <Edit3 size={24} color={theme.primary} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.profileHeader}>
                    <View style={[styles.avatarWrapper, { borderColor: theme.primary, borderWidth: 2 }]}>
                        <Image
                            source={user?.avatar ? { uri: user.avatar } : require('../../assets/google.png')}
                            style={styles.avatar}
                        />
                    </View>
                    <Text style={[styles.userName, { color: theme.text }]}>{user?.name || 'Supun Priyanath'}</Text>
                    <Text style={[styles.userEmail, { color: theme.secondaryText }]}>{user?.email || 'supun123@gmail.com'}</Text>
                </View>

                {user?.bio && (
                    <View style={[styles.bioSection, { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }]}>
                        <Text style={[styles.bioText, { color: theme.text }]}>{user.bio}</Text>
                    </View>
                )}

                <View style={styles.menuContainer}>
                    <MenuItem icon={<Settings size={22} color={theme.text} />} title="Account Settings" theme={theme} />
                    <MenuItem icon={<Bell size={22} color={theme.text} />} title="Notifications" theme={theme} />
                    <MenuItem icon={<Shield size={22} color={theme.text} />} title="Privacy & Security" theme={theme} />
                    <MenuItem icon={<HelpCircle size={22} color={theme.text} />} title="Help Center" theme={theme} />
                    <MenuItem onPress={onLogout} icon={<LogOut size={22} color="#FF4757" />} title="Logout" theme={theme} isLast isDanger />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

function MenuItem({ icon, title, theme, isLast, isDanger, onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.menuItem, !isLast && { borderBottomWidth: 1, borderBottomColor: theme.border + '20' }]}
        >
            <View style={styles.menuIcon}>{icon}</View>
            <Text style={[styles.menuTitle, { color: isDanger ? '#FF4757' : theme.text }]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    backButton: {
        padding: 5,
    },
    editButton: {
        padding: 5,
    },
    scrollContent: {
        paddingHorizontal: 30,
        paddingTop: 20,
        paddingBottom: 40,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 30,
    },
    avatarWrapper: {
        width: 120,
        height: 120,
        borderRadius: 60,
        padding: 3,
        marginBottom: 20,
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 57,
        backgroundColor: '#CCC',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    userEmail: {
        fontSize: 16,
        fontWeight: '500',
    },
    bioSection: {
        padding: 20,
        borderRadius: 20,
        marginBottom: 30,
        alignItems: 'center',
    },
    bioText: {
        fontSize: 15,
        lineHeight: 22,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    menuContainer: {
        width: '100%',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 18,
        gap: 15,
    },
    menuIcon: {
        width: 30,
        alignItems: 'center',
    },
    menuTitle: {
        fontSize: 17,
        fontWeight: '600',
    },
});
