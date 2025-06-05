import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LogScreen from '../screens/LogScreen';
import LogHistoryScreen from '../screens/LogHistoryScreen';

const Stack = createNativeStackNavigator();

export default function LogStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="LogMain"
                component={LogScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="History"
                component={LogHistoryScreen}
                options={{ title: 'Geschiedenis' }}
            />
        </Stack.Navigator>
    );
}