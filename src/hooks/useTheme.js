// hooks/useTheme.js
import { useColorScheme } from 'react-native';
import { Colors } from '../constants/colors'; 

// Added 'mode' parameter to accept manual overrides
export function useTheme(mode) {
  const systemScheme = useColorScheme();
  
  // Logic: Use the manual 'mode' if provided, otherwise fallback to system
  const currentScheme = mode || systemScheme || 'dark'; 
  
  return Colors[currentScheme] || Colors.dark;
}