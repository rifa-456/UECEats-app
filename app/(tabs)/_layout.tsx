import React from 'react';
import { Tabs, Redirect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Or any icon library you prefer
import { useAuth } from '@/context/AuthContext'; // Import useAuth

export default function TabLayout() {
    const { isAuthenticated, isLoading } = useAuth();

    // While checking auth state, don't render tabs
    if (isLoading) {
        return null;
    }

    // If not authenticated, redirect to the login screen.
    // This is a safeguard, as the root _layout should handle this.
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
                headerShown: true, // Show headers for tab screens
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