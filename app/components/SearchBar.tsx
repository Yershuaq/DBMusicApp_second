import React, { useState } from 'react';
import { TextInput, View, Button } from 'react-native';

type Track = {
    id: string;
    name: string;
};

type SearchBarProps = {
    onResults: (tracks: Track[]) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onResults }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        const results: Track[] = [
            { id: '1', name: 'Result 1' },
            { id: '2', name: 'Result 2' }
        ];
        onResults(results);
    };

    return (
        <View>
            <TextInput value={query} onChangeText={setQuery} placeholder="Search..." />
            <Button title="Search" onPress={handleSearch} />
        </View>
    );
};

export default SearchBar;
