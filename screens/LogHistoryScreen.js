import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from '../constants/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default function LogHistoryScreen() {
    const [logs, setLogs] = useState([]);

    const fetchLogs = async () => {
        const snapshot = await getDocs(collection(db, 'logs'));
        const data = snapshot.docs.map((doc) => doc.data());
        setLogs(data.reverse());
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>📜 Geschiedenis</Text>

            <FlatList
                data={logs}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.logItem}>
                        <Text style={styles.logText}>
                            #{index + 1} – {item.dose} mg ({item.supplement}) – Mood: {item.mood} – Energy: {item.energy}
                        </Text>
                        {item.notes ? (
                            <Text style={styles.noteText}>📝 {item.notes}</Text>
                        ) : null}
                    </View>
                )}
                contentContainerStyle={{ paddingBottom: 80 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    logItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#444',
        paddingVertical: 8,
    },
    logText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    noteText: {
        color: '#A8B0C3',
        fontSize: 14,
        marginTop: 2,
    },
});