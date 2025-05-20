import React from 'react';
import { Tabs, Redirect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/hooks/useAuth';

export default function TabLayout() {
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading) {
        return null;
    }
    if (!isAuthenticated) {
        return <Redirect href="/" />;
    }
    return (
        <Tabs
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: React.ComponentProps<typeof Ionicons>['name'] = 'alert-circle';

                    if (route.name === 'welcome') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'test') {
                        iconName = focused ? 'cube' : 'cube-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: true,
            })}
        >
            <Tabs.Screen
                name="welcome"
                options={{
                    title: 'Welcome Home',
                }}
            />
            <Tabs.Screen
                name="test"
                options={{
                    title: 'Test Page',
                }}
            />
        </Tabs>
    );
}