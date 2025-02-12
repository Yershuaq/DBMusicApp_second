import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { getAuthUrl, exchangeToken } from '../api/auth';

export default function LoginScreen() {
    const [loading, setLoading] = useState(false);
    const [authUrl, setAuthUrl] = useState('');
    const navigation = useNavigation();

    const handleLogin = () => {
        setAuthUrl(getAuthUrl());
    };

    const handleWebViewNavigation = async (event: any) => {
        const url = event.url;
        if (url.startsWith('your_redirect_uri')) {
            const code = new URL(url).searchParams.get('code');
            if (code) {
                setLoading(true);
                const token = await exchangeToken(code);
                setLoading(false);
                if (token) navigation.navigate('Home');
            }
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {authUrl ? (
                <WebView
                    source={{ uri: authUrl }}
                    onNavigationStateChange={handleWebViewNavigation}
                    style={{ width: '100%', height: '100%' }}
                />
            ) : (
                <>
                    <Text style={{ fontSize: 24, marginBottom: 20 }}>Вход через Spotify</Text>
                    {loading ? <ActivityIndicator size="large" /> : <Button title="Войти" onPress={handleLogin} />}
                </>
            )}
        </View>
    );
}
