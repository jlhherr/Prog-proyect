import React, { useState } from 'react';
import { useAuth } from '../components/contexts/AuthContext'; // Adjust the import path if necessary

function CreatePlaylistModal({ isOpen, onClose, onCreate }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState('');
    const { token } = useAuth("state"); // Simplified useAuth hook

    const handleCreatePlaylist = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setIsError('');

        if (!name) {
            setIsError('Name is required.');
            setIsLoading(false);
            return;
        }

        const playlistData = {
            name,
            description: description || '',
            public: isPublic,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/playlists/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${token}`, 
                },
                body: JSON.stringify(playlistData),
            });

            if (!response.ok) {
                throw new Error('Error creating the playlist');
            }

            const data = await response.json();
            onCreate(data); // Notify parent component of the new playlist
            onClose();
        } catch (error) {
            console.error("Error creating playlist:", error);
            setIsError('Error creating the playlist. Please try again.');
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
                    <p className="modal-card-title">Create Playlist</p>
                    <button className="delete" aria-label="close" onClick={onClose}></button>
                </header>
                <form onSubmit={handleCreatePlaylist}>
                    <section className="modal-card-body">
                        <div className="field">
                            <label className="label">Name</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    maxLength={255}
                                    placeholder="Playlist Name"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Description</label>
                            <div className="control">
                                <textarea
                                    className="textarea"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Playlist Description (optional)"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="checkbox">
                                <input
                                    type="checkbox"
                                    checked={isPublic}
                                    onChange={(e) => setIsPublic(e.target.checked)}
                                />
                                Public
                            </label>
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

export default CreatePlaylistModal;
