import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

function DeleteSongModal({ isOpen, onClose, song_id, onDelete }) {
    const { token } = useAuth("state");

    const handleDeteleSong = (event) => {
        event.preventDefault();

        onDelete.doFetch(
            `${import.meta.env.VITE_API_BASE_URL}/harmonyhub/songs/${song_id}/`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Token ${token}`,
                },
            }
        );
    };

    useEffect(() => {
        if (onDelete.data) {
            onClose();
        }
    }, [onDelete.data]);

    if (!isOpen) return null;

    return (
        <div className={`modal ${isOpen ? "is-active" : ""}`}>
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Eliminar Canción</p>
                    <button
                        className="delete"
                        aria-label="close"
                        onClick={onClose}
                    ></button>
                </header>
                <section className="modal-card-body">
                    <form onSubmit={handleDeteleSong}>
                        <div className="field">
                            <p className="subtitle">
                                Estas seguro que deseas eliminar esta canción.
                                No se podrá recuperar este recurso.
                            </p>
                        </div>
                        <button
                            className="button is-danger"
                            type="submit"
                            disabled={onDelete.isLoading}
                        >
                            {onDelete.isLoading ? "Eliminando..." : "Confirmar"}
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default DeleteSongModal;