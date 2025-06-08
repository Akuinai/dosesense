import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function ScreenHeader({
                                         showBack,
                                         onProfilePress,
                                         onSettingsPress,
                                         profileImage = null
                                     }) {
    const navigation = useNavigation();

    return (
        <View style={styles.wrapper}>
            <View style={styles.left}>
                {showBack && (
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                    >
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                )}
                <Image
                    source={require('../assets/logo-dosesense.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.right}>
                <TouchableOpacity onPress={onProfilePress} style={styles.iconButton}>
                    {profileImage ? (
                        <Image source={profileImage} style={styles.avatar} />
                    ) : (
                        <Ionicons name="person-circle-outline" size={26} color="#4F79C6" />
                    )}
                </TouchableOpacity>

                <TouchableOpacity onPress={onSettingsPress} style={styles.iconButton}>
                    <Ionicons name="settings-outline" size={24} color="#4F79C6" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        backgroundColor: '#2A2929',
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 10,
    },
    logo: {
        width: 60,  // exact zoals in je originele LogoHeader
        height: 60,
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        marginLeft: 12,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
});