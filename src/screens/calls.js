import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PhoneIncoming, PhoneOutgoing, PhoneMissed, Phone } from 'lucide-react-native';
import { useTheme } from '../hooks/useTheme';

import { GlobalStyles } from '../constants/globalStyles';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import BottomNav from '../components/BottomNav';
import CallCard from '../components/CallCard';

const MOCK_CALLS = [
    { id: '1', name: 'Supun Priyanath', time: 'Today, 10:30 AM', type: 'incoming', image: 'https://i.pravatar.cc/150?u=1' },
    { id: '2', name: 'Princess', time: 'Yesterday, 08:45 PM', type: 'missed', image: 'https://i.pravatar.cc/150?u=2' },
    { id: '3', name: 'Kusal Mendis', time: 'Yesterday, 06:15 PM', type: 'outgoing', image: 'https://i.pravatar.cc/150?u=3' },
    { id: '4', name: 'Keyara Fernando', time: 'Feb 12, 09:00 AM', type: 'missed', image: 'https://i.pravatar.cc/150?u=4' },
    { id: '5', name: 'Muralitharan', time: 'Feb 10, 04:30 PM', type: 'incoming', image: 'https://i.pravatar.cc/150?u=5' },
];

// Consolidated CallCard component is used now.

export default function Calls({ onNavigate, mode, user }) {
    const theme = useTheme(mode);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <Header
                mode={mode}
                title="Calls"
                userAvatar={user?.avatar}
                rightIcon={<PhoneIncoming size={26} color={theme.text} />}
            // Using PhoneIncoming as a placeholder for "New Call" icon since lucide might not have PhonePlus directly available or I should check.
            // Actually, let's check if I imported PhonePlus or I can use MessageSquarePlus again but different icon.
            // The design has a phone with a plus. Let's try to find a suitable icon.
            // I will use Phone for now, or maybe I should check imports.
            />
            <SearchBar mode={mode} style={{ marginBottom: 10 }} />

            <View style={styles.listHeader}>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Calls</Text>
            </View>

            <View style={[
                GlobalStyles.listWrapper,
                { backgroundColor: theme.surface },
                GlobalStyles.listWrapperBorder(mode)
            ]}>
                <FlatList
                    data={MOCK_CALLS}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <CallCard item={item} theme={theme} />}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            </View>

            <BottomNav onNavigate={onNavigate} currentTab="Calls" mode={mode} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    listHeader: {
        paddingHorizontal: 25,
        marginTop: 10,
        marginBottom: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    listContent: { paddingHorizontal: 20, paddingBottom: 20 },
});
