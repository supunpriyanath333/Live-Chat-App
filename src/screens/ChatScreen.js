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
    { id: '1', text: 'Hii..', time: '08:31', date: '2025-01-22', isMe: false, avatar: 'https://i.pravatar.cc/150?u=4' },
    { id: '2', text: 'Hii.. Keyara.', time: '10:32', date: '2025-01-22', isMe: true, read: true, avatar: MY_AVATAR },
    { id: '3', text: 'How are you ?', time: '10:45', date: '2026-02-23', isMe: false, avatar: 'https://i.pravatar.cc/150?u=4' },
    {
        id: '4',
        text: 'i am good..',
        time: '11:00',
        date: '2026-02-23',
        isMe: true,
        read: true,
        avatar: MY_AVATAR,
        replyTo: { author: 'Keyara Fernando', text: 'How are you ?' }
    },
    {
        id: '11',
        type: 'image',
        imageUri: 'https://picsum.photos/seed/chat1/400/300',
        time: '11:15',
        date: '2026-02-23',
        isMe: false,
        avatar: 'https://i.pravatar.cc/150?u=4'
    },
    {
        id: '5',
        text: 'ok..',
        time: '11:32',
        date: '2026-02-23',
        isMe: false,
        avatar: 'https://i.pravatar.cc/150?u=4',
        replyTo: { author: 'You', text: 'i am good..' }
    },
    { id: '6', text: 'How about you?', time: '11:33', date: '2026-02-24', isMe: true, read: true, avatar: MY_AVATAR },
    {
        id: '12',
        type: 'video',
        thumbnail: 'https://picsum.photos/seed/video1/400/300',
        duration: '01:24',
        time: '11:35',
        date: '2026-02-24',
        isMe: true,
        read: true,
        avatar: MY_AVATAR
    },
    { id: '7', text: 'I hope fine. noh?', time: '11:34', date: '2026-02-24', isMe: true, read: true, avatar: MY_AVATAR },
    {
        id: '13',
        type: 'document',
        fileName: 'Project_Requirements.pdf',
        fileSize: '2.4 MB',
        time: '11:38',
        date: '2026-02-24',
        isMe: false,
        avatar: 'https://i.pravatar.cc/150?u=4'
    },
    {
        id: '8',
        text: 'Yes. fine',
        time: '11:40',
        date: '2026-02-24',
        isMe: false,
        avatar: 'https://i.pravatar.cc/150?u=4',
        replyTo: { author: 'You', text: 'I hope fine. noh?' }
    },
    {
        id: '9',
        type: 'audio',
        duration: '00:16',
        time: '20:45',
        date: '2026-02-24',
        isMe: false,
        avatar: 'https://i.pravatar.cc/150?u=4'
    },
    {
        id: '10',
        type: 'audio',
        duration: '00:10',
        time: '20:51',
        date: '2026-02-24',
        isMe: true,
        read: true,
        avatar: MY_AVATAR
    }
];

export default function ChatScreen({ chat, onBack, mode, onCall, onVideoCall }) {
    const theme = useTheme(mode);
    const [messages, setMessages] = useState(MOCK_MESSAGES);

    const handleSend = (text) => {
        const now = new Date();
        const newMessage = {
            id: String(messages.length + 1),
            text,
            time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            date: now.toISOString().split('T')[0],
            isMe: true,
            read: false,
            avatar: MY_AVATAR
        };
        setMessages([...messages, newMessage]);
    };

    const formatDateLabel = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        const isToday = date.toDateString() === today.toDateString();
        const isYesterday = date.toDateString() === yesterday.toDateString();

        if (isToday) return 'Today';
        if (isYesterday) return 'Yesterday';

        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const getGroupedMessages = () => {
        const grouped = [];
        let lastDate = null;

        messages.forEach((msg) => {
            if (msg.date !== lastDate) {
                grouped.push({ id: `date-${msg.date}`, isDateSeparator: true, date: msg.date });
                lastDate = msg.date;
            }
            grouped.push(msg);
        });

        return grouped;
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
                    data={getGroupedMessages()}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        if (item.isDateSeparator) {
                            return (
                                <View style={styles.dateSeparator}>
                                    <View style={[styles.dateLine, { backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)' }]} />
                                    <Text style={[styles.dateText, { color: theme.secondaryText }]}>
                                        {formatDateLabel(item.date)}
                                    </Text>
                                    <View style={[styles.dateLine, { backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)' }]} />
                                </View>
                            );
                        }
                        return <MessageBubble message={item} isMe={item.isMe} theme={theme} mode={mode} />;
                    }}
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
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    dateSeparator: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        paddingHorizontal: 10,
    },
    dateLine: {
        flex: 1,
        height: 1,
    },
    dateText: {
        fontSize: 12,
        fontWeight: '500',
        marginHorizontal: 15,
        textTransform: 'capitalize',
    },
});
