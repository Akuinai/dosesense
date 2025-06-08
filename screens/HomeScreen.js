import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../constants/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { generateSmartAdvice } from '../components/generateSmartAdvice';
import ScreenHeader from '../components/ScreenHeader';
import PrimaryButton from '../components/PrimaryButton';

export default function HomeScreen() {
    const [logs, setLogs] = useState([]);
    const [advice, setAdvice] = useState('');
    const [canShowAdvice, setCanShowAdvice] = useState(false);
    const navigation = useNavigation();

    const fetchLogs = async () => {
        const snapshot = await getDocs(collection(db, 'logs'));
        const data = snapshot.docs.map(doc => doc.data());
        const sorted = data.sort((a, b) => b.created?.seconds - a.created?.seconds);
        setLogs(sorted);

        if (sorted.length === 0) {
            setAdvice('');
            setCanShowAdvice(false);
            return;
        }

        const firstWithSupplement = sorted.find(
            log => log.supplement && log.supplement.trim() !== ''
        );

        if (!firstWithSupplement) {
            setAdvice('Om advies op te stellen moet je eerst een supplement opgeven in je logs.');
            setCanShowAdvice(false);
            return;
        }

        const supplement = firstWithSupplement.supplement;
        const supplementLogs = sorted.filter(log => log.supplement === supplement);

        if (supplementLogs.length >= 7) {
            setAdvice(generateSmartAdvice(sorted));
            setCanShowAdvice(true);
        } else {
            setAdvice(
                `Om advies op te stellen dien je minimaal 7 keer het supplement "${supplement}" te loggen.`
            );
            setCanShowAdvice(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const latest = logs.length > 0 ? logs[0] : null;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ScreenHeader />
            <Text style={styles.header}>Welkom bij DoseSense</Text>

            <Text style={styles.sectionTitle}>Persoonlijk advies</Text>
            <Text style={[styles.advice, !canShowAdvice && styles.adviceWarning]}>
                {advice || 'Er is nog geen advies beschikbaar.'}
            </Text>

            <Text style={styles.sectionTitle}>Laatste log</Text>
            {latest ? (
                <>
                    <Text style={styles.logItem}>
                        {latest.dose} mg ({latest.supplement || 'Geen supplement'}) – Mood: {latest.mood} – Energy: {latest.energy}
                    </Text>
                    {latest.notes ? (
                        <Text style={styles.notes}>{latest.notes}</Text>
                    ) : null}
                </>
            ) : (
                <Text style={styles.advice}>Je hebt nog niks gelogd.</Text>
            )}

            <View style={styles.buttonRow}>
                <View style={styles.halfButton}>
                    <PrimaryButton
                        title="Bekijk alle logs"
                        iconName="time-outline"
                        onPress={() => navigation.navigate('Log', { screen: 'History' })}
                        color="#3E5B99"
                    />
                </View>
            </View>
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
    advice: {
        color: '#FFFFFF',
        fontSize: 16,
        marginBottom: 10,
    },
    adviceWarning: {
        color: '#FFFFFF',
        fontStyle: 'italic',
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
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 35,
        marginTop: 30,
        marginBottom: 40,
    },
    halfButton: {
        width: 200,
    },
});