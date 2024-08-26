
import { useState, useEffect } from "react";
import {useAuth} from "../contexts/AuthContext";
import useFetch from "../hooks/useFetch";

function EditSongModal({ isOpen, onClose, songId, onUpdate }) {
    const { token } = useAuth("state");
    const [song, setSong] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchSong = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/harmonyhub/songs/${songId}/`,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );
            const data = await response.json();
            setSong(data);
        } catch (error) {
            console.error("Error fetching song:", error);
        }
    };

    useEffect(() => {
        if (isOpen && songId) {
            fetchSong();
        }
    }, [isOpen, songId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSong((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateSong = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/harmonyhub/songs/${songId}/`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Token ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(song),
                }
            );
            const data = await response.json();
            onUpdate(data);
            onClose();
        } catch (error) {
            console.error("Error updating song:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen || !song) return null;


    return (
        <div className={`modal ${isOpen ? "is-active" : ""}`}>
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Editar Canción</p>
                    <button className="edit" aria-label="close" onClick={onClose}></button>
                </header>
                <section className="modal-card-body">
                    <form onSubmit={handleUpdateSong}>
                        <div className="field">
                            <label className="label">Título:</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Álbum:</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    name="album"
                                    value={formData.album}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Año:</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="number"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        {/* Add other fields as needed */}
                        <div className="field">
                            <button className="button is-primary" type="submit">Actualizar</button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default EditSongModal;
