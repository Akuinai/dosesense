import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LogScreen from '../screens/LogScreen'; // hoofd logformulier
import LogHistoryScreen from '../screens/LogHistoryScreen'; // geschiedenis

const Stack = createNativeStackNavigator();

export default function LogStack() {
    return (
        <Stack.Navigator
            initialRouteName="LogMain"
            screenOptions={{ headerShown: false }} // geen witte ruimte
        >
            <Stack.Screen
                name="LogMain"
                component={LogScreen}
            />
            <Stack.Screen
                name="History"
                component={LogHistoryScreen}
            />
        </Stack.Navigator>
    );
}