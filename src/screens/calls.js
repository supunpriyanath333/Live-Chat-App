import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PhoneIncoming, PhoneOutgoing, PhoneMissed, Phone } from 'lucide-react-native';
import { useTheme } from '../hooks/useTheme';

import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import BottomNav from '../components/BottomNav';

const MOCK_CALLS = [
    { id: '1', name: 'Supun Priyanath', time: 'Today, 10:30 AM', type: 'incoming', image: 'https://i.pravatar.cc/150?u=1' },
    { id: '2', name: 'Princess', time: 'Yesterday, 08:45 PM', type: 'missed', image: 'https://i.pravatar.cc/150?u=2' },
    { id: '3', name: 'Kusal Mendis', time: 'Yesterday, 06:15 PM', type: 'outgoing', image: 'https://i.pravatar.cc/150?u=3' },
    { id: '4', name: 'Keyara Fernando', time: 'Feb 12, 09:00 AM', type: 'missed', image: 'https://i.pravatar.cc/150?u=4' },
    { id: '5', name: 'Muralitharan', time: 'Feb 10, 04:30 PM', type: 'incoming', image: 'https://i.pravatar.cc/150?u=5' },
];

const CallItem = ({ item, theme }) => {
    const getIcon = () => {
        switch (item.type) {
            case 'incoming': return <PhoneIncoming size={16} color={theme.primary} />;
            case 'outgoing': return <PhoneOutgoing size={16} color={theme.secondaryText} />;
            case 'missed': return <PhoneMissed size={16} color="#FF453A" />;
            default: return <Phone size={16} color={theme.secondaryText} />;
        }
    };

    return (
        <TouchableOpacity style={styles.callItem}>
            <Image source={{ uri: item.image }} style={styles.avatar} />
            <View style={styles.callInfo}>
                <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>
                <View style={styles.callMeta}>
                    {getIcon()}
                    <Text style={[styles.time, { color: theme.secondaryText }]}>{item.time}</Text>
                </View>
            </View>
            <TouchableOpacity>
                <Phone size={24} color={theme.primary} />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

export default function Calls({ onNavigate, mode }) {
    const theme = useTheme(mode);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <Header mode={mode} title="Calls" />
            <SearchBar mode={mode} />

            <View style={[styles.listWrapper, { backgroundColor: theme.surface }]}>
                <FlatList
                    data={MOCK_CALLS}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <CallItem item={item} theme={theme} />}
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
    listWrapper: {
        flex: 1,
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
        paddingTop: 30,
        marginTop: 20,
    },
    listContent: { paddingBottom: 20 },
    callItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
    callInfo: { flex: 1 },
    name: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
    callMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    time: { fontSize: 12 },
});
