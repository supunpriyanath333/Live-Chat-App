import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Play, CheckCheck, CornerDownRight, CornerDownLeft } from 'lucide-react-native';

const MessageBubble = ({ message, isMe, theme }) => {
    const isAudio = message.type === 'audio';
    const hasReply = !!message.replyTo;

    // UI specific colors based on the image
    const theirBubbleColor = theme.mode === 'dark' ? '#333' : '#fff';
    const theirTextColor = theme.mode === 'dark' ? '#ccc' : '#000';

    return (
        <View style={[
            styles.container,
            isMe ? styles.myMessageContainer : styles.theirMessageContainer
        ]}>
            {/* Their Avatar */}
            {!isMe && message.avatar && (
                <Image source={{ uri: message.avatar }} style={styles.avatar} />
            )}

            <View style={isMe ? { alignItems: 'flex-end', flex: 1 } : { alignItems: 'flex-start', flex: 1 }}>

                {/* Reply Group - Positioned to overlap */}
                {hasReply && (
                    <View style={[styles.replyGroup, isMe ? { alignItems: 'flex-end' } : { alignItems: 'flex-start' }]}>
                        <View style={[
                            styles.replyBubble,
                            { backgroundColor: '#222', borderColor: 'rgba(255,255,255,0.05)' }
                        ]}>
                            <Text style={styles.replyText} numberOfLines={1}>{message.replyTo.text}</Text>
                        </View>

                        {/* Connector Icon positioned between bubbles */}
                        <View style={[
                            styles.connector,
                            isMe ? styles.myConnector : styles.theirConnector
                        ]}>
                            {isMe ? (
                                <CornerDownRight size={18} color="rgba(255,255,255,0.4)" strokeWidth={2} />
                            ) : (
                                <CornerDownLeft size={18} color="rgba(255,255,255,0.4)" strokeWidth={2} />
                            )}
                        </View>
                    </View>
                )}

                {/* Main Content Area */}
                <View style={isMe ? { alignItems: 'flex-end', marginBottom: 20 } : { alignItems: 'flex-start', marginBottom: 20 }}>
                    <View style={[
                        styles.bubble,
                        isMe ? { backgroundColor: '#2E8B57' } : { backgroundColor: '#fff' },
                        isMe ? styles.myBubble : styles.theirBubble,
                    ]}>
                        {isAudio ? (
                            <View style={styles.audioContainer}>
                                <TouchableOpacity>
                                    <Play size={20} color={isMe ? '#fff' : '#000'} fill={isMe ? '#fff' : '#000'} />
                                </TouchableOpacity>
                                <View style={styles.waveform}>
                                    {[...Array(12)].map((_, i) => (
                                        <View key={i} style={[
                                            styles.waveling,
                                            { height: Math.random() * 10 + 5, backgroundColor: isMe ? '#fff' : '#ccc' }
                                        ]} />
                                    ))}
                                </View>
                            </View>
                        ) : (
                            <Text style={[styles.text, { color: isMe ? '#fff' : '#000' }]}>
                                {message.text}
                            </Text>
                        )}
                    </View>

                    {/* Meta info aligned to the right of the message bubble */}
                    <View style={styles.meta}>
                        {isMe && (
                            <CheckCheck size={14} color={message.read ? '#2ecc71' : '#666'} style={{ marginRight: 4 }} />
                        )}
                        <Text style={[styles.time, { color: '#888' }]}>
                            {message.time}
                        </Text>
                    </View>
                </View>
            </View>

            {/* My Avatar */}
            {isMe && message.avatar && (
                <Image source={{ uri: message.avatar }} style={styles.avatarMe} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 15,
        paddingHorizontal: 10,
        alignItems: 'flex-end', // Keeps avatar at the bottom of the stack
    },
    myMessageContainer: {
        justifyContent: 'flex-end',
    },
    theirMessageContainer: {
        justifyContent: 'flex-start',
    },
    avatar: {
        width: 42,
        height: 42,
        borderRadius: 21,
        marginRight: 10,
        borderWidth: 2,
        borderColor: '#fff',
    },
    avatarMe: {
        width: 42,
        height: 42,
        borderRadius: 21,
        marginLeft: 10,
        borderWidth: 2,
        borderColor: '#fff',
    },
    replyGroup: {
        marginBottom: -8, // Pulls the main bubble up to overlap
        zIndex: 0,
        width: '90%',
    },
    replyBubble: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        borderWidth: 1,
        backgroundColor: '#222',
        minWidth: 100,
    },
    replyText: {
        color: '#777',
        fontSize: 14,
    },
    connector: {
        position: 'absolute',
        bottom: -10,
    },
    myConnector: {
        left: -20,
    },
    theirConnector: {
        right: -20,
    },
    bubble: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        zIndex: 1, // Ensures main message is on top
    },
    myBubble: {
        borderBottomRightRadius: 2,
    },
    theirBubble: {
        borderBottomLeftRadius: 2,
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
    },
    meta: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: -18,
        right: 0,
    },
    time: {
        fontSize: 12,
        fontWeight: '600',
    },
    audioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        minWidth: 100,
    },
    waveform: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        marginLeft: 8,
    },
    waveling: {
        width: 2,
        borderRadius: 1
    }
});

export default MessageBubble;