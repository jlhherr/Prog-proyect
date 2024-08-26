import React from "react";

function DeleteArtistModal({ isOpen, onClose, artist_id, onDelete }) {
    const handleDelete = () => {
        fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/artists/${artist_id}/`, {
            method: "DELETE",
        })
            .then(() => {
                onDelete(artist_id);
                onClose();
            })
            .catch((error) => {
                console.error("Error deleting artist:", error);
            });
    };

    if (!isOpen) return null;

    return (
        <div className="modal is-active">
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-content">
                <div className="box">
                    <h2 className="title">Eliminar Artista</h2>
                    <p>¿Estás seguro de que deseas eliminar este artista?</p>
                    <div className="field is-grouped">
                        <button className="button is-danger" onClick={handleDelete}>
                            Eliminar
                        </button>
                        <button className="button" onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
        </div>
    );
}

export default DeleteArtistModal;
