import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../constants/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { generateSmartAdvice } from '../components/generateSmartAdvice.js';
import LogoHeader from '../components/LogoHeader'; // ← zorg dat dit component bestaat

export default function HomeScreen() {
    const [logs, setLogs] = useState([]);
    const [advice, setAdvice] = useState('');
    const navigation = useNavigation();

    const fetchLogs = async () => {
        const snapshot = await getDocs(collection(db, 'logs'));
        const data = snapshot.docs.map(doc => doc.data());
        const sorted = data.sort((a, b) => b.created?.seconds - a.created?.seconds);
        setLogs(sorted);
        setAdvice(generateSmartAdvice(sorted));
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const latest = logs.length > 0 ? logs[0] : null;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <LogoHeader />

            <Text style={styles.header}>Welkom bij DoseSense</Text>

            <Text style={styles.sectionTitle}>📍 Persoonlijk advies</Text>
            <Text style={styles.advice}>{advice}</Text>

            {latest && (
                <>
                    <Text style={styles.sectionTitle}>🕒 Laatste log</Text>
                    <Text style={styles.logItem}>
                        {latest.dose} mg ({latest.supplement}) – Mood: {latest.mood} – Energy: {latest.energy}
                    </Text>
                    {latest.notes ? (
                        <Text style={styles.notes}>📝 {latest.notes}</Text>
                    ) : null}
                </>
            )}

            <View style={{ marginTop: 30 }}>
                <Button
                    title="Bekijk alle logs"
                    onPress={() => navigation.navigate('Log', { screen: 'History' })}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#2A2929',
        padding: 20,
        paddingTop: 50, // gelijke ruimte als LogHistoryScreen
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
        color: '#FBE39B',
        marginTop: 20,
        marginBottom: 5,
    },
    advice: {
        color: '#CCCCCC',
        fontSize: 16,
        marginBottom: 10,
    },
    logItem: {
        color: '#FFFFFF',
        fontSize: 16,
        marginBottom: 4,
    },
    notes: {
        color: '#AAAAAA',
        fontStyle: 'italic',
        fontSize: 14,
    },
});