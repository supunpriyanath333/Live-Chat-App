import React, { useState } from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, UserPlus, Star } from 'lucide-react-native';
import { useTheme } from '../hooks/useTheme';

import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ContactCard from '../components/ContactCard';
import BottomNav from '../components/BottomNav';

const MOCK_CONTACTS = [
    { id: '1', name: 'Supun Priyanath', status: 'Available', online: true, image: 'https://i.pravatar.cc/150?u=1' },
    { id: '2', name: 'Princess', status: 'Busy', online: true, image: 'https://i.pravatar.cc/150?u=2' },
    { id: '3', name: 'Kusal Mendis', status: 'At work', online: false, image: 'https://i.pravatar.cc/150?u=3' },
    { id: '4', name: 'Keyara Fernando', status: 'In a meeting', online: false, image: 'https://i.pravatar.cc/150?u=4' },
    { id: '5', name: 'Muralitharan', status: 'Sleeping', online: true, image: 'https://i.pravatar.cc/150?u=5' },
    { id: '6', name: 'Dilshan', status: 'Available', online: true, image: 'https://i.pravatar.cc/150?u=6' },
    { id: '7', name: 'Sangakkara', status: 'Coding...', online: false, image: 'https://i.pravatar.cc/150?u=7' },
    { id: '8', name: '100 - Emergency', status: 'Official Number', online: true, image: 'https://i.pravatar.cc/150?u=8' },
];

export default function ContactsScreen({ onBack, onOpenChat, onOpenAddContact, onNavigate, mode, user }) {
    const theme = useTheme(mode);
    const [searchQuery, setSearchQuery] = useState('');

    const groupContacts = (contacts) => {
        const filtered = contacts.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
        const groups = {};

        filtered.forEach(contact => {
            const firstChar = contact.name.trim().charAt(0).toUpperCase();
            let groupKey = '';

            if (/[A-Z]/.test(firstChar)) {
                groupKey = firstChar;
            } else if (/[0-9]/.test(firstChar)) {
                groupKey = '#';
            } else {
                groupKey = '★'; // For icons/special characters
            }

            if (!groups[groupKey]) groups[groupKey] = [];
            groups[groupKey].push(contact);
        });

        const sortedKeys = Object.keys(groups).sort((a, b) => {
            if (a === '★') return -1;
            if (b === '★') return 1;
            if (a === '#') return 1;
            if (b === '#') return -1;
            return a.localeCompare(b);
        });

        return sortedKeys.map(key => ({
            title: key,
            data: groups[key].sort((a, b) => a.name.localeCompare(b.name))
        }));
    };

    const sections = groupContacts(MOCK_CONTACTS);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <Header
                mode={mode}
                title="Contacts"
                userAvatar={user?.avatar}
                onRightPress={onOpenAddContact}
                rightIcon={<UserPlus size={26} color={theme.text} />}
            />

            <View style={styles.headerRow}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <ArrowLeft size={24} color={theme.text} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: theme.text }]}>New Chat</Text>
            </View>

            <SearchBar mode={mode} onChangeText={setSearchQuery} value={searchQuery} />

            <View style={[
                styles.listWrapper,
                {
                    backgroundColor: theme.surface,
                    borderWidth: 1,
                    borderBottomWidth: 0,
                    borderColor: mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'
                }
            ]}>
                <SectionList
                    sections={sections}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ContactCard
                            item={item}
                            theme={theme}
                            onMessage={(contact) => onOpenChat(contact)}
                            onPhone={() => { }}
                            onVideo={() => { }}
                        />
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <View style={[styles.sectionHeader, { backgroundColor: theme.surface }]}>
                            {title === '★' ? (
                                <Star size={14} color={theme.primary} fill={theme.primary} />
                            ) : (
                                <Text style={[styles.sectionHeaderTitle, { color: theme.primary }]}>{title}</Text>
                            )}
                        </View>
                    )}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    stickySectionHeadersEnabled={true}
                />
            </View>
            <BottomNav onNavigate={onNavigate} currentTab="Home" mode={mode} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 15,
        marginTop: 10,
    },
    backButton: {
        marginRight: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    listWrapper: {
        flex: 1,
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
        paddingTop: 10,
        marginTop: 20,
    },
    listContent: {
        paddingBottom: 20,
    },
    sectionHeader: {
        paddingHorizontal: 30,
        paddingVertical: 10,
        justifyContent: 'center',
    },
    sectionHeaderTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
