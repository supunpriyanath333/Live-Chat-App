import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Paperclip, Mic, Sticker } from 'lucide-react-native';

const ChatInput = ({ onSend, theme, mode }) => {
    const [text, setText] = useState('');

    const handleSend = () => {
        if (text.trim()) {
            onSend(text);
            setText('');
        }
    };

    const borderColor = mode === 'dark' ? 'rgba(183, 183, 183, 0.39)' : 'rgba(0, 0, 0, 0.17)';

    return (
        <View style={[styles.container, { backgroundColor: theme.background, borderColor }]}>
            <TouchableOpacity style={styles.iconButton}>
                <Paperclip size={24} color={theme.text} />
            </TouchableOpacity>

            <View style={[styles.inputWrapper, { backgroundColor: theme.searchBar }]}>
                <TextInput
                    style={[styles.input, { color: theme.text }]}
                    placeholder="Type your message"
                    placeholderTextColor={theme.secondaryText}
                    value={text}
                    onChangeText={setText}
                    onSubmitEditing={handleSend}
                    multiline
                />
                <TouchableOpacity style={styles.stickerButton}>
                    <Sticker size={22} color={theme.secondaryText} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.micButton}>
                <Mic size={24} color={theme.text} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderWidth: 1,
        borderBottomWidth: 0,
    },
    iconButton: {
        marginRight: 10,
    },
    inputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    input: {
        flex: 1,
        fontSize: 15,
        maxHeight: 100,
        paddingVertical: 8,
    },
    stickerButton: {
        marginLeft: 10,
    },
    micButton: {
        marginLeft: 15,
    },
});

export default ChatInput;
