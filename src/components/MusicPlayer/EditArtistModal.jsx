import React, { useState, useEffect } from "react";

function EditArtistModal({ isOpen, onClose, artist_id, onUpdate }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image_url, setImageUrl] = useState("");

    useEffect(() => {
        // Fetch the existing artist data to pre-fill the form
        fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/artists/${artist_id}/`)
            .then((response) => response.json())
            .then((data) => {
                setName(data.name);
                setDescription(data.description);
                setImageUrl(data.image_url);
            });
    }, [artist_id]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedArtist = { name, description, image_url };

        fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/artists/${artist_id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedArtist),
        })
            .then((response) => response.json())
            .then((data) => {
                onUpdate(data);
                onClose();
            });
    };

    if (!isOpen) return null;

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-content">
                <form className="box" onSubmit={handleSubmit}>
                    <h2 className="title">Editar Artista</h2>
                    <div className="field">
                        <label className="label">Nombre</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Descripción</label>
                        <div className="control">
                            <textarea
                                className="textarea"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">URL de la imagen</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                value={image_url}
                                onChange={(e) => setImageUrl(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <button className="button is-primary" type="submit">
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
        </div>
    );
}

export default EditArtistModal;
