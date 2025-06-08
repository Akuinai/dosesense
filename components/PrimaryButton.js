import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PrimaryButton({ onPress, title, iconName, color = '#4F79C6', iconColor = '#FFFFFF', textColor = '#FFFFFF' }) {
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
            <View style={styles.content}>
                {iconName && <Ionicons name={iconName} size={16} color={iconColor} style={{ marginRight: 6 }} />}
                <Text style={[styles.text, { color: textColor }]}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
});