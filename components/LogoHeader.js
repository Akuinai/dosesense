import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function LogoHeader() {
    return (
        <View style={styles.wrapper}>
            <Image
                source={require('../assets/logo-dosesense.png')}
                style={styles.logo}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        paddingTop: 20,
        paddingLeft: 20,
        paddingBottom: 10,
    },
    logo: {
        width: 60,
        height: 60,
    },
});