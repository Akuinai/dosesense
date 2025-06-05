import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to DoseSense</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2A2929',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        color: '#CCCCCC',
        fontSize: 16,
    },
});