import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PhoneIncoming, PhoneOutgoing, PhoneMissed, Phone, Plus } from 'lucide-react-native';
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

export default function Calls({ onNavigate, mode, user, onOpenContacts, onProfilePress, onCall, onVideoCall }) {
    const theme = useTheme(mode);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <Header
                mode={mode}
                title="Calls"
                userAvatar={user?.avatar}
                rightIcon={
                    <View style={{ position: 'relative' }}>
                        <Phone size={26} color={theme.text} />
                        <View style={{
                            position: 'absolute',
                            top: -2,
                            right: -6,
                            backgroundColor: theme.background,
                            borderRadius: 6,
                            padding: 1,
                        }}>
                            <Plus size={16} color={theme.text} strokeWidth={3} />
                        </View>
                    </View>
                }
                onRightPress={onOpenContacts}
                onProfilePress={onProfilePress}
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
                    renderItem={({ item }) => <CallCard item={item} theme={theme} onCall={() => onCall?.(item)} onVideoCall={() => onVideoCall?.(item)} />}
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
