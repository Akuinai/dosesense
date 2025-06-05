import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/HomeScreen';
import StatsScreen from './screens/StatsScreen';
import LogStack from './components/LogStack'; // Log-tab met eigen navigatie (Log + History)

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: { backgroundColor: '#1E2A47' },
                    tabBarActiveTintColor: '#FBE39B',
                    tabBarInactiveTintColor: '#A8B0C3',
                }}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Log" component={LogStack} />
                <Tab.Screen name="Stats" component={StatsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}