import React, { useState, useEffect } from 'react';
import LogoHeader from '../components/LogoHeader';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { db } from '../constants/firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export default function LogScreen() {
    const [dose, setDose] = useState('');
    const [mood, setMood] = useState('');
    const [energy, setEnergy] = useState('');
    const [supplement, setSupplement] = useState('');
    const [notes, setNotes] = useState('');
    const [logs, setLogs] = useState([]);
    const [advice, setAdvice] = useState('');

    const navigation = useNavigation();

    const submitLog = async () => {
        if (!dose || !mood || !energy) {
            setAdvice('Fill in dosage, mood and energy.');
            return;
        }

        try {
            await addDoc(collection(db, 'logs'), {
                dose,
                mood,
                energy,
                supplement,
                notes,
                created: new Date()
            });

            function generateAdvice({ dose, mood, energy }) {
                const d = parseFloat(dose);
                const m = parseInt(mood);
                const e = parseInt(energy);

                let result = '';

                if (m <= 2 && d < 15) {
                    result += 'Je stemming is laag. Overweeg een iets hogere dosering.\n';
                } else if (m >= 4 && d >= 10) {
                    result += 'Je stemming is goed. Deze dosering lijkt effectief.\n';
                }

                if (e <= 2) {
                    result += 'Je energieniveau is laag. Let op je slaap en supplementtype.';
                }

                return result || 'Houd je huidige dosering aan en blijf regelmatig loggen.';
            }

            const generatedAdvice = generateAdvice({ dose, mood, energy });
            setAdvice(generatedAdvice);

            setDose('');
            setMood('');
            setEnergy('');
            setSupplement('');
            setNotes('');
            fetchLogs();
            Keyboard.dismiss();
        } catch (error) {
            console.error('Error while logging:', error);
            setAdvice('Error while logging.');
        }
    };

    const fetchLogs = async () => {
        const snapshot = await getDocs(collection(db, 'logs'));
        const data = snapshot.docs.map((doc) => doc.data());
        setLogs(data.reverse());
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.container}>
                    <LogoHeader />
                    <Text style={styles.header}>📝 Nieuwe log</Text>

                    <Text style={styles.label}>Supplement</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Psilocybine, LSD, Lion’s Mane..."
                        value={supplement}
                        onChangeText={setSupplement}
                        placeholderTextColor="#AAAAAA"
                    />

                    <Text style={styles.label}>Dosering (mg)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="0.2"
                        keyboardType="decimal-pad"
                        value={dose}
                        onChangeText={setDose}
                        placeholderTextColor="#AAAAAA"
                    />

                    <Text style={styles.label}>Stemming</Text>
                    <View style={styles.selectorRow}>
                        {[1, 2, 3, 4, 5].map((value) => (
                            <Text
                                key={value}
                                style={[
                                    styles.emojiButton,
                                    mood === value.toString() && styles.emojiSelected,
                                ]}
                                onPress={() => setMood(value.toString())}
                            >
                                {value <= 2 ? '😞' : value === 3 ? '😐' : '😁'}
                            </Text>
                        ))}
                    </View>

                    <Text style={styles.label}>Energie</Text>
                    <View style={styles.selectorRow}>
                        {[1, 2, 3, 4, 5].map((value) => (
                            <Text
                                key={value}
                                style={[
                                    styles.emojiButton,
                                    energy === value.toString() && styles.emojiSelected,
                                ]}
                                onPress={() => setEnergy(value.toString())}
                            >
                                {value <= 2 ? '🪫' : '🔋'}
                            </Text>
                        ))}
                    </View>

                    <Text style={styles.label}>Notities</Text>
                    <TextInput
                        style={[styles.input, { height: 80 }]}
                        placeholder="Optional observations..."
                        value={notes}
                        onChangeText={setNotes}
                        multiline
                        maxLength={250}
                        placeholderTextColor="#AAAAAA"
                    />

                    <View style={styles.buttonRow}>
                        <View style={styles.halfButton}>
                            <Button title="Opslaan" onPress={submitLog} />
                        </View>
                        <View style={styles.halfButton}>
                            <Button
                                title="Annuleer"
                                color="#888"
                                onPress={() => {
                                    setDose('');
                                    setMood('');
                                    setEnergy('');
                                    setSupplement('');
                                    setNotes('');
                                    setAdvice('');
                                }}
                            />
                        </View>
                    </View>

                    {advice ? <Text style={styles.advice}>{advice}</Text> : null}

                    {logs.length > 0 && (
                        <View style={{ marginBottom: 20 }}>
                            <Text style={styles.subheader}>Laatste log</Text>
                            <Text style={styles.logText}>
                                {logs[0].dose} mg ({logs[0].supplement}) – Mood: {logs[0].mood} – Energy: {logs[0].energy}
                            </Text>
                            {logs[0].notes ? (
                                <Text style={styles.noteText}>📝 {logs[0].notes}</Text>
                            ) : null}
                        </View>
                    )}

                    <Button
                        title="Bekijk volledige geschiedenis"
                        onPress={() => navigation.navigate('History')}
                    />
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 50,
        backgroundColor: '#2A2929',
        flexGrow: 1,
    },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#FFFFFF',
    },
    label: {
        color: '#FFFFFF',
        marginBottom: 4,
        fontWeight: '600',
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#444',
        padding: 10,
        borderRadius: 6,
        marginBottom: 15,
        backgroundColor: '#3A3A3A',
        color: '#FFFFFF',
    },
    selectorRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    emojiButton: {
        fontSize: 28,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#3A3A3A',
        color: '#FFFFFF',
        textAlign: 'center',
        minWidth: 50,
    },
    emojiSelected: {
        backgroundColor: '#4F79C6',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    halfButton: {
        width: '48%',
    },
    advice: {
        textAlign: 'center',
        fontStyle: 'italic',
        marginBottom: 10,
        color: '#CCCCCC',
    },
    subheader: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 4,
        color: '#FFFFFF',
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