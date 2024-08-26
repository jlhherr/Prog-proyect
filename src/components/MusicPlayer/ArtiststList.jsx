import React, { useState, useEffect } from 'react';
import ArtistCard from './ArtistCard';
import AddArtistModal from './AddArtistModal';
import { useAuth } from '../contexts/AuthContext';

function ArtistsList() {
    const [artists, setArtists] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState('');
    const { token } = useAuth("state"); 

    
    const fetchArtists = async () => {
        setIsLoading(true);
        setIsError('');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/harmonyhub/artists/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch artists');
            }

            const data = await response.json();
            setArtists(data.results);
        } catch (error) {
            console.error('Error fetching artists:', error);
            setIsError('Error fetching artists. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchArtists();
    }, [token]);

    const handleAddArtist = async (newArtist) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/harmonyhub/artists/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify(newArtist),
            });

            if (!response.ok) {
                throw new Error('Failed to create artist');
            }

            const createdArtist = await response.json();
            setArtists((prevArtists) => [...prevArtists, createdArtist]);
            setIsAddModalOpen(false);
        } catch (error) {
            console.error('Error creating artist:', error);
            setIsError('Error creating artist. Please try again.');
        }
    };

    const handleDeleteArtist = (deletedArtistId) => {
        setArtists((prevArtists) =>
            prevArtists.filter((artist) => artist.id !== deletedArtistId)
        );
    };

    const handleUpdateArtist = (updatedArtist) => {
        setArtists((prevArtists) =>
            prevArtists.map((artist) =>
                artist.id === updatedArtist.id ? updatedArtist : artist
            )
        );
    };

    if (isLoading) return <p>Loading artists...</p>;
    if (isError) return <p>{isError}</p>;

    return (
        <div>
            <h2 className="title">Artist List</h2>
            <div className="field">
                <button
                    className="button is-primary"
                    onClick={() => setIsAddModalOpen(true)}
                >
                    Add Artist
                </button>
            </div>
            <div className="columns is-multiline">
                {artists.length > 0 ? (
                    artists.map((artist) => (
                        <div key={artist.id} className="column is-one-quarter">
                            <ArtistCard
                                artist={artist}
                                onDelete={handleDeleteArtist}
                                onUpdate={handleUpdateArtist}
                            />
                        </div>
                    ))
                ) : (
                    <p>No artists available.</p>
                )}
            </div>
            {isAddModalOpen && (
                <AddArtistModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    onAdd={handleAddArtist}
                />
            )}
        </div>
    );
}

export default ArtistsList;
