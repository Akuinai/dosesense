import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import StatsScreen from './screens/StatsScreen';
import LogStack from './components/LogStack';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: '#1E2A47',
                        height: 70,
                        paddingTop: 5,
                        paddingBottom: 5,
                    },
                    tabBarActiveTintColor: '#FBE39B',
                    tabBarInactiveTintColor: '#A8B0C3',
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        switch (route.name) {
                            case 'Home':
                                iconName = focused ? 'home' : 'home-outline';
                                break;
                            case 'Log':
                                iconName = focused ? 'create' : 'create-outline';
                                break;
                            case 'Stats':
                                iconName = focused ? 'bar-chart' : 'bar-chart-outline';
                                break;
                            default:
                                iconName = 'ellipse';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Log" component={LogStack} />
                <Tab.Screen name="Stats" component={StatsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}