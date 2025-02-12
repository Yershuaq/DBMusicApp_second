import { Text, TextProps, useColorScheme } from 'react-native';
import { StyleSheet } from 'react-native';

// Определяем цвета для светлой и темной темы
const colors = {
    light: {
        text: '#000000', // Черный текст для светлой темы
    },
    dark: {
        text: '#ffffff', // Белый текст для темной темы
    },
};

export function ThemedText(props: TextProps) {
    const theme = useColorScheme(); // Получаем текущую тему (light/dark)
    const color = theme === 'dark' ? colors.dark.text : colors.light.text;

    return <Text style={[styles.text, { color }]} {...props} />;
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: '500',
    },
});
