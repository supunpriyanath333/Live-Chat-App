import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Phone, Video, MoreVertical } from 'lucide-react-native';
import { useTheme } from '../hooks/useTheme';

import MessageBubble from '../components/MessageBubble';
import ChatInput from '../components/ChatInput';
import { GlobalStyles } from '../constants/globalStyles';

const MY_AVATAR = require('../../assets/google.png');

const MOCK_MESSAGES = [
    { id: '1', text: 'Hii..', time: '08:31', isMe: false, avatar: 'https://i.pravatar.cc/150?u=4' },
    { id: '2', text: 'Hii.. Keyara.', time: '10:32', isMe: true, read: true, avatar: MY_AVATAR },
    { id: '3', text: 'How are you ?', time: '10:45', isMe: false, avatar: 'https://i.pravatar.cc/150?u=4' },
    {
        id: '4',
        text: 'i am good..',
        time: '11:00',
        isMe: true,
        read: true,
        avatar: MY_AVATAR,
        replyTo: { author: 'Keyara Fernando', text: 'How are you ?' }
    },
    {
        id: '5',
        text: 'ok..',
        time: '11:32',
        isMe: false,
        avatar: 'https://i.pravatar.cc/150?u=4',
        replyTo: { author: 'You', text: 'i am good..' }
    },
    { id: '6', text: 'How about you?', time: '11:33', isMe: true, read: true, avatar: MY_AVATAR },
    { id: '7', text: 'I hope fine. noh?', time: '11:34', isMe: true, read: true, avatar: MY_AVATAR },
    {
        id: '8',
        text: 'Yes. fine',
        time: '11:40',
        isMe: false,
        avatar: 'https://i.pravatar.cc/150?u=4',
        replyTo: { author: 'You', text: 'I hope fine. noh?' }
    },
    {
        id: '9',
        type: 'audio',
        duration: '00:16',
        time: '20:45',
        isMe: false,
        avatar: 'https://i.pravatar.cc/150?u=4'
    },
    {
        id: '10',
        type: 'audio',
        duration: '00:10',
        time: '20:51',
        isMe: true,
        read: true,
        avatar: MY_AVATAR
    }
];

export default function ChatScreen({ chat, onBack, mode, onCall, onVideoCall }) {
    const theme = useTheme(mode);
    const [messages, setMessages] = useState(MOCK_MESSAGES);

    const handleSend = (text) => {
        const newMessage = {
            id: String(messages.length + 1),
            text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: true,
            read: false,
            avatar: MY_AVATAR
        };
        setMessages([...messages, newMessage]);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            {/* Header */}
            <View style={[
                styles.header,
                { borderColor: mode === 'dark' ? 'rgba(183, 183, 183, 0.39)' : 'rgba(0, 0, 0, 0.17)' }
            ]}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <ArrowLeft size={24} color={theme.text} />
                </TouchableOpacity>

                <Image source={{ uri: chat.image }} style={[styles.avatar, { borderColor: theme.theirAvatarBorder }]} />

                <View style={styles.headerInfo}>
                    <Text style={[styles.headerName, { color: theme.text }]}>{chat.name}</Text>
                    <Text style={[styles.headerStatus, { color: theme.secondaryText }]}>
                        {chat.online ? 'Online' : 'Offline'}
                    </Text>
                </View>

                <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.actionButton} onPress={() => onCall?.(chat)}>
                        <Phone size={22} color={theme.text} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton} onPress={() => onVideoCall?.(chat)}>
                        <Video size={22} color={theme.text} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <MoreVertical size={22} color={theme.text} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Chat Area */}
            {/* Using a subtle pattern or solid color for background */}
            <View style={styles.chatArea}>
                <FlatList
                    data={messages}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <MessageBubble message={item} isMe={item.isMe} theme={theme} mode={mode} />}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            </View>

            {/* Input */}
            <ChatInput onSend={handleSend} theme={theme} mode={mode} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        borderWidth: 1,
        borderTopWidth: 0,
    },
    backButton: {
        padding: 5,
        marginRight: 10,
    },
    avatar: {
        ...GlobalStyles.avatar,
        ...GlobalStyles.avatarMedium,
        marginRight: 10,
    },
    headerInfo: {
        flex: 1,
    },
    headerName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    headerStatus: {
        fontSize: 12,
    },
    headerActions: {
        flexDirection: 'row',
        gap: 15,
    },
    actionButton: {
        padding: 5,
    },
    chatArea: {
        flex: 1,
    },
    listContent: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
});
