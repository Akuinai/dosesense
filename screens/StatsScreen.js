import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ScreenHeader from '../components/ScreenHeader.js';

export default function StatsScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ScreenHeader />
            <Text style={styles.header}>Trends & statistics</Text>

            <Text style={styles.sectionTitle}>Inzichten</Text>
            <Text style={styles.text}>Deze functionaliteit komt binnenkort beschikbaar. Binnenkort zie je hier trends in stemming, energie en supplementgebruik op basis van je logs.</Text>

            <Text style={styles.sectionTitle}>Statistieken</Text>
            <Text style={styles.text}>Bekijk hier straks gemiddelden per supplement, doseerpatronen en persoonlijke progressie.</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#2A2929',
        padding: 20,
        paddingTop: 50,
    },
    header: {
        fontSize: 24,

        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 20,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#4F79C6',
        marginTop: 20,
        marginBottom: 5,
    },
    text: {
        fontSize: 16,
        color: '#CCCCCC',
        marginBottom: 10,
    },
});