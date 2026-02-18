import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function PrimaryButton({ title, onPress, disabled, icon, theme, style }) {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: theme.primary },
                disabled && { opacity: 0.5 },
                style
            ]}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.8}
        >
            <Text style={styles.text}>{title}</Text>
            {icon && <View style={styles.iconWrapper}>{icon}</View>}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 60,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    text: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    iconWrapper: {
        marginLeft: 15,
    },
});
