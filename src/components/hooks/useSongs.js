import { useState, useEffect, useRef } from 'react';

export const useSongs = (apiUrl, options = {}) => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isMounted = useRef(true); 

    useEffect(() => {
        isMounted.current = true; 
        const fetchSongs = async () => {
            setLoading(true);
            setError(null);
            
            try {
                const response = await fetch(apiUrl, options);

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Network response was not ok: ${errorText}`);
                }

                const data = await response.json();

              
                if (isMounted.current) {
                    setSongs(data.results || []);
                }
            } catch (error) {
                if (isMounted.current) {
                    console.error("Error fetching songs:", error);
                    setError("No se pudieron cargar las canciones. Por favor, inténtelo de nuevo más tarde.");
                }
            } finally {
                if (isMounted.current) {
                    setLoading(false);
                }
            }
        };

        fetchSongs();

        
        return () => {
            isMounted.current = false;
        };
    }, [apiUrl, options]);

    return { songs, loading, error };
};
