import React, { useEffect, useState } from 'react';
import { View, Button, Text } from 'react-native';
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player';

const Player = () => {
    const playbackState = usePlaybackState();
    const [track, setTrack] = useState('');

    useEffect(() => {
        const setupPlayer = async () => {
            await TrackPlayer.setupPlayer();
            await TrackPlayer.add({
                id: '1',
                url: 'https://p.scdn.co/mp3-preview/your-track-url.mp3',
                title: 'Track Title',
                artist: 'Artist Name',
                artwork: 'https://your-image-url.jpg',
            });
        };

        setupPlayer();
    }, []);

    const togglePlayPause = async () => {
        const state = await TrackPlayer.getState();
        if (state === State.Playing) {
            await TrackPlayer.pause();
        } else {
            await TrackPlayer.play();
        }
    };

    return (
        <View>
            <Text>{track}</Text>
            <Button title={playbackState.state === State.Playing ? 'Pause' : 'Play'} onPress={togglePlayPause} />
        </View>
    );
};

export default Player;
