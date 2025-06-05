import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import LogoHeader from '../components/LogoHeader';

export default function StatsScreen() {
    return (
        <View style={styles.container}>
            <LogoHeader />
            <View style={styles.content}>
                <Text style={styles.title}>Trends & statistics📊</Text>
                <Text style={styles.subtitle}>Will come soon!</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2A2929',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: 'bold',
    },
    subtitle: {
        color: '#A8B0C3',
        marginTop: 10,
    },
});