// components/SearchBar.js
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Search } from 'lucide-react-native';
import { useTheme } from '../hooks/useTheme';

export default function SearchBar({ style, mode }) {
  const theme = useTheme(mode);
  return (
    <View style={[
      styles.container,
      {
        backgroundColor: theme.searchBar,
        borderColor: mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
        borderWidth: 1.2
      },
      style
    ]}>
      <TextInput
        placeholder="Search Chat"
        placeholderTextColor={theme.secondaryText}
        style={[styles.input, { color: theme.text }]}
      />
      <Search color={theme.secondaryText} size={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 15,
    borderRadius: 20,
    height: 50,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
});