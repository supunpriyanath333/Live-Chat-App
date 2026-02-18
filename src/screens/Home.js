import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';

// Import the components we created
import { GlobalStyles } from '../constants/globalStyles';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ChatCard from '../components/ChatCard';
import BottomNav from '../components/BottomNav';

const MOCK_CHATS = [
  { id: '1', name: 'Supun Priyanath', message: 'I am coming to outside', time: '22:31', unread: 2, online: true, image: 'https://i.pravatar.cc/150?u=1', isMe: false, isGroup: false },
  { id: '2', name: 'Princess', message: 'Me ane matanm ba katha karanna..', time: '20:46', unread: 4, online: true, image: 'https://i.pravatar.cc/150?u=2', isMe: false, isGroup: false },
  { id: '3', name: 'Kusal Mendis', message: 'Ane palayan yanna', time: '10.56', unread: 0, online: false, image: 'https://i.pravatar.cc/150?u=3', isMe: true, status: 'seen', isGroup: false },
  { id: '4', name: 'Keyara Fernando', message: 'Hii.. Kohomathe..', time: '1 day ago', unread: 0, online: false, image: 'https://i.pravatar.cc/150?u=4', isMe: false, isGroup: false },
  { id: '5', name: 'Muralitharan', message: 'Mage mathe eka baa..', time: '5 days ago', unread: 0, online: true, image: 'https://i.pravatar.cc/150?u=5', isMe: true, status: 'delivered', isGroup: false },
];

// Added 'mode' prop to the arguments to catch the theme state from App.js
export default function Home({ onNavigate, onOpenChat, onOpenContacts, onProfilePress, mode, user }) {
  // Pass 'mode' into useTheme so it updates when you toggle the switch
  const theme = useTheme(mode);
  const [activeTab, setActiveTab] = useState('All');

  const filteredChats = MOCK_CHATS.filter(chat => {
    if (activeTab === 'All') return true;
    if (activeTab === 'UNREAD') return chat.unread > 0;
    return true;
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Passed mode to Header and SearchBar */}
      <Header
        mode={mode}
        title="Chats"
        userAvatar={user?.avatar}
        onRightPress={onOpenContacts}
        onProfilePress={onProfilePress}
      />
      <SearchBar mode={mode} />

      {/* Filter Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[activeTab === 'All' ? styles.activeTab : styles.inactiveTab, { backgroundColor: activeTab === 'All' ? theme.primary : 'transparent' }]}
          onPress={() => setActiveTab('All')}
        >
          <Text style={[styles.activeTabText, { color: activeTab === 'All' ? '#FFFFFF' : theme.secondaryText }]}>All</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[activeTab === 'UNREAD' ? styles.activeTab : styles.inactiveTab, { backgroundColor: activeTab === 'UNREAD' ? theme.primary : 'transparent' }]}
          onPress={() => setActiveTab('UNREAD')}
        >
          <Text style={[styles.activeTabText, { color: activeTab === 'UNREAD' ? '#FFFFFF' : theme.secondaryText }]}>UNREAD</Text>
        </TouchableOpacity>
      </View>

      {/* Curved Chat List Container */}
      <View style={[
        GlobalStyles.listWrapper,
        { backgroundColor: theme.surface },
        GlobalStyles.listWrapperBorder(mode)
      ]}>
        <FlatList
          data={filteredChats}
          keyExtractor={(item) => item.id}
          // Passed mode to ChatCard
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onOpenChat(item)}>
              <ChatCard item={item} mode={mode} />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Passed mode to BottomNav */}
      <BottomNav onNavigate={onNavigate} currentTab="Home" mode={mode} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 25,
    marginBottom: 25,
  },
  activeTab: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
  },
  inactiveTab: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  activeTabText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  tabText: {
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.5,
  },
  listContent: {
    paddingBottom: 20,
  },
});