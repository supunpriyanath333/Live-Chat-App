import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Paperclip, Mic, Camera, Smile } from 'lucide-react-native';

const ChatInput = ({ onSend, theme }) => {
    const [text, setText] = useState('');

    const handleSend = () => {
        if (text.trim()) {
            onSend(text);
            setText('');
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <TouchableOpacity style={styles.iconButton}>
                <Paperclip size={22} color={theme.secondaryText} />
            </TouchableOpacity>

            <View style={[styles.inputContainer, { backgroundColor: theme.searchBar }]}>
                <TouchableOpacity style={styles.smileyButton}>
                    <Smile size={20} color={theme.secondaryText} />
                </TouchableOpacity>
                <TextInput
                    style={[styles.input, { color: theme.text }]}
                    placeholder="Type your message"
                    placeholderTextColor={theme.secondaryText}
                    value={text}
                    onChangeText={setText}
                    onSubmitEditing={handleSend}
                    multiline
                />
                <TouchableOpacity style={styles.cameraButton}>
                    <Camera size={20} color={theme.secondaryText} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={[styles.micButton, { backgroundColor: theme.surface }]}>
                <Mic size={22} color={theme.text} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderTopWidth: 0.5,
        borderTopColor: 'rgba(255,255,255,0.1)',
    },
    iconButton: {
        padding: 10,
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 25,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        minHeight: 40,
    },
    input: {
        flex: 1,
        fontSize: 16,
        maxHeight: 100,
        paddingHorizontal: 10,
    },
    micButton: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    smileyButton: {
        padding: 5
    },
    cameraButton: {
        padding: 5
    }
});

export default ChatInput;
