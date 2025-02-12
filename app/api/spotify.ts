import axios from 'axios';
import { getSpotifyToken } from './auth';

const SPOTIFY_API_URL = 'https://api.spotify.com/v1';

export async function searchTracks(query: string) {
    const token = await getSpotifyToken();
    if (!token) return [];

    try {
        const response = await axios.get(`${SPOTIFY_API_URL}/search`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { q: query, type: 'track', limit: 10 },
        });

        return response.data.tracks.items;
    } catch (error) {
        console.error('Ошибка поиска:', error);
        return [];
    }
}
