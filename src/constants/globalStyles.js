export const GlobalStyles = {
    avatar: {
        borderWidth: 1,
    },
    avatarSmall: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
    },
    avatarMedium: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    avatarLarge: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    avatarCall: {
        width: 55,
        height: 55,
        borderRadius: 27.5,
    },
    actionBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(16, 172, 132, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listWrapper: {
        flex: 1,
        borderTopLeftRadius: 45,
        borderTopRightRadius: 45,
        paddingTop: 30, // Using 30 from Home.js as it looks more spacious
        marginTop: 0,
    },
    listWrapperBorder: (mode) => ({
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'
    }),
    call: {
        accept: '#34C759',
        decline: '#FF3B30',
        end: '#FF3B30',
        active: 'rgba(255,255,255,0.2)',
        activeDark: 'rgba(0,0,0,0.2)',
    },
    callButton: {
        width: 75,
        height: 75,
        borderRadius: 37.5,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    callControlLabel: {
        marginTop: 15,
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
    },
    callAvatarContainer: {
        width: 140,
        height: 140,
        borderRadius: 70,
        overflow: 'hidden',
        borderWidth: 2,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.05)',
    }
};
