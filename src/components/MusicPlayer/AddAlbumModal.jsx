import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Adjust the import path if necessary

// Utility function for making fetch requests
const doFetch = async (url, options) => {
    const response = await fetch(url, options);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Network response was not ok');
    }
    return response.json();
};

function AddAlbumModal({ isOpen, onClose, onAdd }) {
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [artist, setArtist] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState('');
    const { token } = useAuth("state"); 

    const handleAddAlbum = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setIsError('');

        if (!title || !artist) {
            setIsError('Title and Artist ID are required.');
            setIsLoading(false);
            return;
        }

        const albumData = {
            title,
            year: year ? parseInt(year, 10) : null,
            artist: parseInt(artist, 10),
        };

        try {
            const data = await doFetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/albums/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify(albumData),
            });

            onAdd(data); 
            onClose();
        } catch (error) {
            console.error("Error creating album:", error);
            setIsError('Error creating the album. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Add Album</p>
                    <button className="delete" aria-label="close" onClick={onClose}></button>
                </header>
                <form onSubmit={handleAddAlbum}>
                    <section className="modal-card-body">
                        <div className="field">
                            <label className="label">Title</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    maxLength={255}
                                    placeholder="Album Title"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Year</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="number"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    min="1900" 
                                    max={new Date().getFullYear()} 
                                    placeholder="Optional Year"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Artist ID</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="number"
                                    value={artist}
                                    onChange={(e) => setArtist(e.target.value)}
                                    required
                                    placeholder="Artist ID"
                                />
                            </div>
                        </div>
                        {isError && <p className="help is-danger">{isError}</p>}
                    </section>
                    <footer className="modal-card-foot">
                        <button type="submit" className={`button is-primary ${isLoading ? 'is-loading' : ''}`}>
                            Create
                        </button>
                        <button type="button" className="button" onClick={onClose}>
                            Cancel
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    );
}

export default AddAlbumModal;
