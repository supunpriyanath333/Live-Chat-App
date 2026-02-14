// components/SearchBar.js
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Search } from 'lucide-react-native';
import { useTheme } from '../hooks/useTheme';

export default function SearchBar() {
  const theme = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.searchBar }]}>
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
    borderRadius: 25,
    height: 45,
    marginBottom: 20,
  },
  input: { flex: 1, fontSize: 16 },
});