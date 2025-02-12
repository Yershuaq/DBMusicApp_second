import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../api/auth';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
    const [token, setToken] = useState<string | null>(null);
    const navigation = useNavigation();

    useEffect(() => {
        const checkToken = async () => {
            const savedToken = await AsyncStorage.getItem('access_token');
            setToken(savedToken);
        };
        checkToken();
    }, []);

    const handleLogout = async () => {
        await logout();
        navigation.navigate('Login');
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24 }}>Добро пожаловать!</Text>
            <Text>Твой токен: {token ? token.substring(0, 10) + '...' : 'Нет'}</Text>
            <Button title="Выйти" onPress={handleLogout} />
        </View>
    );
}
