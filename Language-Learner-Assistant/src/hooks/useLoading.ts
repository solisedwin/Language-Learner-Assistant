
import {useState} from 'react';

export function useLoading() {
    const [isLoading, setIsLoading] = useState(false);
    const startRequest = () => setIsLoading(true);
    const stopRequest = () => setIsLoading(false);

    return {
        isLoading,
        startRequest,
        stopRequest
    }
}