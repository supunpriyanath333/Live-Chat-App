import React from 'react';
import { View, Text, StyleSheet, FlatList} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';

// Import the components we created
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ChatCard from '../components/ChatCard';
import BottomNav from '../components/BottomNav';

const MOCK_CHATS = [
  { id: '1', name: 'Supun Priyanath', message: 'I am coming to outside', time: '22:31', unread: 2, online: true, image: 'https://i.pravatar.cc/150?u=1' },
  { id: '2', name: 'Princess', message: 'Me ane matanm ba katha karanna..', time: '20:46', unread: 4, online: true, image: 'https://i.pravatar.cc/150?u=2' },
  { id: '3', name: 'Kusal Mendis', message: 'Ane palayan yanna', time: '10.56', unread: 0, online: false, image: 'https://i.pravatar.cc/150?u=3' },
  { id: '4', name: 'Keyara Fernando', message: 'Hii.. Kohomathe..', time: '1 day ago', unread: 0, online: false, image: 'https://i.pravatar.cc/150?u=4' },
  { id: '5', name: 'Muralitharan', message: 'Mage mathe eka baa..', time: '5 days ago', unread: 0, online: true, image: 'https://i.pravatar.cc/150?u=5' },
];

// Added 'mode' prop to the arguments to catch the theme state from App.js
export default function Home({ onNavigate, mode }) {
  // Pass 'mode' into useTheme so it updates when you toggle the switch
  const theme = useTheme(mode);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Passed mode to Header and SearchBar */}
      <Header mode={mode} />
      <SearchBar mode={mode} />

      {/* Filter Tabs */}
      <View style={styles.tabContainer}>
        <View style={[styles.activeTab, { backgroundColor: theme.primary }]}>
          <Text style={styles.activeTabText}>All</Text>
        </View>
        <Text style={[styles.tabText, { color: theme.secondaryText }]}>UNREAD</Text>
        <Text style={[styles.tabText, { color: theme.secondaryText }]}>GROUPS</Text>
      </View>

      {/* Curved Chat List Container */}
      <View style={[styles.listWrapper, { backgroundColor: theme.surface }]}>
        <FlatList
          data={MOCK_CHATS}
          keyExtractor={(item) => item.id}
          // Passed mode to ChatCard
          renderItem={({ item }) => <ChatCard item={item} mode={mode} />}
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
    paddingVertical: 6,
    borderRadius: 8,
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  tabText: {
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.5,
  },
  listWrapper: {
    flex: 1,
    borderTopLeftRadius: 45, // Creates the curved look from the UI
    borderTopRightRadius: 45,
    paddingTop: 30,
  },
  listContent: {
    paddingBottom: 20,
  },
});