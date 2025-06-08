import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../constants/firebaseConfig';
import ScreenHeader from '../components/ScreenHeader';
import PrimaryButton from '../components/PrimaryButton';

export default function LogHistoryScreen() {
    const [logs, setLogs] = useState([]);
    const navigation = useNavigation();

    const fetchLogs = async () => {
        const snapshot = await getDocs(collection(db, 'logs'));
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setLogs(data.reverse());
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const deleteAllLogs = async () => {
        const snapshot = await getDocs(collection(db, 'logs'));
        const deletions = snapshot.docs.map((d) =>
            deleteDoc(doc(db, 'logs', d.id))
        );
        await Promise.all(deletions);
        setLogs([]);
    };

    return (
        <View style={styles.container}>
            <ScreenHeader />

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="arrow-back" size={26} color="#4F79C6" />
            </TouchableOpacity>

            <Text style={styles.header}>📜 Geschiedenis</Text>

            <FlatList
                data={logs}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <View style={styles.logItem}>
                        <Text style={styles.logText}>
                            #{index + 1} – {item.dose} mg ({item.supplement || 'Onbekend'}) – Mood: {item.mood} – Energy: {item.energy}
                        </Text>
                        {item.notes ? (
                            <Text style={styles.noteText}>📝 {item.notes}</Text>
                        ) : null}
                    </View>
                )}
                contentContainerStyle={{ paddingBottom: 80 }}
                ListFooterComponent={
                    logs.length > 0 ? (
                        <View style={styles.footerContainer}>
                            <Text style={styles.warningText}>
                                ⚠️ Dit verwijdert <Text style={{ fontWeight: 'bold' }}>{logs.length}</Text> log(s)
                            </Text>
                            <PrimaryButton
                                title="Verwijder alle logs"
                                iconName="trash-outline"
                                onPress={deleteAllLogs}
                                color="#CC4444"
                            />
                        </View>
                    ) : null
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2A2929',
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    backButton: {
        position: 'absolute',
        top: 85,
        left: 10,
        zIndex: 10,
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
    warningText: {
        color: '#FF9999',
        textAlign: 'center',
    },
    footerContainer: {
        marginTop: 30,
        alignItems: 'center',
        gap: 10,
    },
});