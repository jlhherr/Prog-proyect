import React, { useState } from 'react';

function AddArtistModal({ isOpen, onClose, onAdd }) {
    const [artistName, setArtistName] = useState('');
    const [artistImage, setArtistImage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newArtist = {
            name: artistName,
            image: artistImage, 
        };

        onAdd(newArtist);
    };

    if (!isOpen) return null;

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Add Artist</p>
                    <button className="delete" aria-label="close" onClick={onClose}></button>
                </header>
                <section className="modal-card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label className="label">Artist Name</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Enter artist name"
                                    value={artistName}
                                    onChange={(e) => setArtistName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Artist Image URL</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Enter image URL"
                                    value={artistImage}
                                    onChange={(e) => setArtistImage(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button className="button is-primary" type="submit">
                                    Add Artist
                                </button>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default AddArtistModal;
