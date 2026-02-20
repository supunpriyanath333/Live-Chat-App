// src/screens/Settings.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { Moon, Sun, ChevronLeft } from 'lucide-react-native';

// Added onNavigate prop here
export default function SettingsScreen({ onToggleTheme, isDarkMode, onNavigate, onProfilePress, mode, onTriggerIncomingCall }) {
  const theme = useTheme(mode);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => onNavigate('Home')}
        >
          <ChevronLeft color={theme.text} size={28} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Settings</Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.surface }]}>
        <View style={styles.row}>
          <View style={styles.labelGroup}>
            {isDarkMode ? <Moon color={theme.primary} size={22} /> : <Sun color={theme.primary} size={22} />}
            <Text style={[styles.label, { color: theme.text }]}>Dark Mode</Text>
          </View>
          <Switch
            trackColor={{ false: '#767577', true: theme.primary }}
            thumbColor={'#f4f3f4'}
            onValueChange={onToggleTheme}
            value={isDarkMode}
          />
        </View>
      </View>

      <View style={[styles.section, { backgroundColor: theme.surface, marginTop: 20 }]}>
        <TouchableOpacity style={styles.row} onPress={onTriggerIncomingCall}>
          <View style={styles.labelGroup}>
            <Text style={[styles.label, { color: theme.primary }]}>Test Incoming Call</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    padding: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  backButton: {
    marginLeft: -10, // Adjusts position to align with title better
    padding: 5,
  },
  title: { fontSize: 28, fontWeight: 'bold' },
  section: { marginHorizontal: 20, borderRadius: 20, padding: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  labelGroup: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  label: { fontSize: 18, fontWeight: '500' },
});