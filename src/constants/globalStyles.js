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
    })
};
