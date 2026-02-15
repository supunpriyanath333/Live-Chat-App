import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Play, CheckCheck, CornerDownRight, CornerDownLeft } from 'lucide-react-native';
import { Colors } from '../constants/colors';

const MessageBubble = ({ message, isMe, theme, mode }) => {
    const isAudio = message.type === 'audio';
    const hasReply = !!message.replyTo;

    const theirBubbleColor = theme.theirBubble;
    const theirTextColor = theme.onTheirBubble;

    return (
        <View style={[
            styles.container,
            isMe ? styles.myMessageContainer : styles.theirMessageContainer
        ]}>
            {/* Avatar - Positioned at the bottom of the bubble stack to match UI */}
            {!isMe && message.avatar && (
                <Image
                    source={typeof message.avatar === 'string' ? { uri: message.avatar } : message.avatar}
                    style={styles.avatar}
                />
            )}

            <View style={isMe ? { alignItems: 'flex-end' } : { alignItems: 'flex-start' }}>

                {/* Reply Context (The upper bubble) */}
                {hasReply && (
                    <View style={styles.replyGroup}>
                        <View style={[
                            styles.replyBubble,
                            { backgroundColor: theme.replyBubble, borderColor: theme.replyBorder }
                        ]}>
                            <Text style={styles.replyText} numberOfLines={1}>{message.replyTo.text}</Text>
                        </View>

                        {/* The Curved Connector Icon */}
                        <View style={[
                            styles.connector,
                            isMe ? styles.myConnector : styles.theirConnector
                        ]}>
                            {isMe ? (
                                <CornerDownRight size={22} color={theme.connector} strokeWidth={1.5} />
                            ) : (
                                <CornerDownLeft size={22} color={theme.connector} strokeWidth={1.5} />
                            )}
                        </View>
                    </View>
                )}

                {/* Message Content Group (Bubble + Time) */}
                <View style={styles.mainContent}>
                    {/* Main Message Bubble */}
                    <View style={[
                        styles.bubble,
                        isMe ? { backgroundColor: theme.primary } : { backgroundColor: theirBubbleColor },
                        isMe ? styles.myBubble : styles.theirBubble,
                        hasReply ? styles.bubbleWithReply : {}
                    ]}>
                        {isAudio ? (
                            <View style={styles.audioContainer}>
                                <TouchableOpacity>
                                    <Play size={24} color={isMe ? Colors.dark.text : theirTextColor} fill={isMe ? Colors.dark.text : theirTextColor} />
                                </TouchableOpacity>
                                <View style={styles.waveform}>
                                    {[...Array(15)].map((_, i) => (
                                        <View key={i} style={[
                                            styles.waveling,
                                            {
                                                height: Math.random() * 10 + 5,
                                                backgroundColor: isMe ? theme.onPrimarySurface : theme.secondaryText
                                            }
                                        ]} />
                                    ))}
                                </View>
                                <Text style={[styles.duration, { color: isMe ? Colors.dark.text : theme.secondaryText }]}>
                                    {message.duration}
                                </Text>
                            </View>
                        ) : (
                            <Text style={[styles.text, { color: isMe ? Colors.dark.text : theirTextColor }]}>
                                {message.text}
                            </Text>
                        )}
                    </View>

                    {/* Meta info (Time and Checks) */}
                    <View style={[styles.meta, { justifyContent: 'flex-end' }]}>
                        {isMe && (
                            <CheckCheck size={16} color={message.read ? theme.primary : theme.secondaryText} style={{ marginRight: 5 }} />
                        )}
                        <Text style={[styles.time, { color: theme.secondaryText }]}>
                            {message.time}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Avatar for Me - match image layout */}
            {isMe && message.avatar && (
                <Image
                    source={typeof message.avatar === 'string' ? { uri: message.avatar } : message.avatar}
                    style={styles.avatarMe}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 20,
        paddingHorizontal: 15,
        alignItems: 'flex-end',
    },
    myMessageContainer: {
        justifyContent: 'flex-end',
    },
    theirMessageContainer: {
        justifyContent: 'flex-start',
    },
    avatar: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#ffffffee',
    },
    avatarMe: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        marginLeft: 8,
        borderWidth: 1,
        borderColor: '#ffffff5a',
    },
    replyGroup: {
        marginBottom: -12, // Overlapped by the main bubble
        zIndex: 1,
        width: '100%',
    },
    replyBubble: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        minWidth: 50,
        maxWidth: 100,
        opacity: 0.8,
    },
    replyText: {
        color: Colors.dark.secondaryText,
        fontSize: 12,
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
    mainContent: {
        zIndex: 2,
    },
    bubble: {
        paddingHorizontal: 18,
        paddingVertical: 11,
        borderRadius: 12,
        minWidth: 50,
        maxWidth: 200,
        marginBottom: 2,
    },
    bubbleWithReply: {
        marginTop: 5,
    },
    myBubble: {
        borderBottomRightRadius: 2,
    },
    theirBubble: {
        borderBottomLeftRadius: 2,
    },
    text: {
        fontSize: 14,
        fontWeight: '500',
    },
    meta: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: -15,
        right: 0,
    },
    time: {
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 0,

    },
    audioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    waveform: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        height: 20
    },
    waveling: {
        width: 2,
        borderRadius: 1
    },
    duration: {
        fontSize: 11
    }
});

export default MessageBubble;