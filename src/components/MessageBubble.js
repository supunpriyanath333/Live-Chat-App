import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Play, CheckCheck, CornerDownRight, CornerDownLeft, FileText, Download } from 'lucide-react-native';
import { Colors } from '../constants/colors';
import { GlobalStyles } from '../constants/globalStyles';

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
                    style={[styles.avatar, { borderColor: theme.theirAvatarBorder }]}
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
                        ) : message.type === 'image' ? (
                            <View style={styles.mediaContainer}>
                                <Image source={{ uri: message.imageUri }} style={styles.imageMedia} resizeMode="cover" />
                            </View>
                        ) : message.type === 'video' ? (
                            <View style={styles.mediaContainer}>
                                <Image source={{ uri: message.thumbnail }} style={styles.imageMedia} resizeMode="cover" />
                                <View style={styles.videoOverlay}>
                                    <View style={styles.playIconContainer}>
                                        <Play size={20} color="#fff" fill="#fff" />
                                    </View>
                                    <Text style={styles.videoDuration}>{message.duration}</Text>
                                </View>
                            </View>
                        ) : message.type === 'document' ? (
                            <View style={styles.documentContainer}>
                                <View style={[styles.fileIcon, { backgroundColor: isMe ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.05)' }]}>
                                    <FileText size={24} color={isMe ? Colors.dark.text : theme.primary} />
                                </View>
                                <View style={styles.fileInfo}>
                                    <Text style={[styles.fileName, { color: isMe ? Colors.dark.text : theirTextColor }]} numberOfLines={1}>
                                        {message.fileName}
                                    </Text>
                                    <Text style={[styles.fileSize, { color: isMe ? 'rgba(255,255,255,0.7)' : theme.secondaryText }]}>
                                        {message.fileSize}
                                    </Text>
                                </View>
                                <TouchableOpacity style={styles.downloadBtn}>
                                    <Download size={20} color={isMe ? Colors.dark.text : theme.secondaryText} />
                                </TouchableOpacity>
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
                    style={[styles.avatarMe, { borderColor: theme.myAvatarBorder }]}
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
        ...GlobalStyles.avatar,
        ...GlobalStyles.avatarSmall,
        marginRight: 8,
    },
    avatarMe: {
        ...GlobalStyles.avatar,
        ...GlobalStyles.avatarSmall,
        marginLeft: 8,
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
    },
    mediaContainer: {
        width: 180,
        height: 120,
        borderRadius: 8,
        overflow: 'hidden',
        marginHorizontal: -8,
        marginVertical: -5,
    },
    imageMedia: {
        width: '100%',
        height: '100%',
    },
    videoOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    playIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoDuration: {
        position: 'absolute',
        bottom: 5,
        right: 10,
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    documentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        gap: 12,
        width: 180,
    },
    fileIcon: {
        width: 45,
        height: 45,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fileInfo: {
        flex: 1,
    },
    fileName: {
        fontSize: 13,
        fontWeight: '600',
    },
    fileSize: {
        fontSize: 11,
        marginTop: 2,
    },
    downloadBtn: {
        padding: 5,
    }
});

export default MessageBubble;