import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { GlobalStyles } from '../constants/globalStyles';

export default function CallControl({ onPress, icon: Icon, label, backgroundColor, isPulsing, textColor }) {
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (isPulsing) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1.15,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        } else {
            pulseAnim.setValue(1);
        }
    }, [isPulsing, pulseAnim]);

    return (
        <View style={styles.actionItem}>
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                <TouchableOpacity
                    onPress={onPress}
                    style={[GlobalStyles.callButton, { backgroundColor: backgroundColor || 'rgba(255,255,255,0.2)' }]}
                >
                    <Icon size={32} color="#fff" />
                </TouchableOpacity>
            </Animated.View>
            {label && (
                <Text style={[GlobalStyles.callControlLabel, { color: textColor || '#fff' }]}>
                    {label}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    actionItem: {
        alignItems: 'center',
    },
});
