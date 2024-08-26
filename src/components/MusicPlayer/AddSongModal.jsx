import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function AddSongModal({ isOpen, onClose, onAdd }) {
    const { token } = useAuth("state");
    const [formData, setFormData] = useState({
        title: "",
        album: "",
        year: "",
        cover: null,
        song_file: null,
        artists: "",
        genres: "",
    });
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
       
        if (!formData.title || !formData.album || !formData.year) {
            setError("Please fill in all required fields.");
            return;
        }
        setError("");
        setSuccessMessage("");

        const formPayload = new FormData();
        formPayload.append("title", formData.title);
        formPayload.append("album", formData.album);
        formPayload.append("year", formData.year);

        if (formData.cover) {
            formPayload.append("cover", formData.cover);
        }

        if (formData.song_file) {
            formPayload.append("song_file", formData.song_file);
        }

        if (formData.artists) {
            formPayload.append("artists", formData.artists);
        }

        if (formData.genres) {
            formPayload.append("genres", formData.genres);
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/harmonyhub/songs/`, {
                method: "POST",
                headers: {
                    Authorization: `Token ${token}`,
                },
                body: formPayload,
            });

            if (!response.ok) {
                throw new Error("Failed to add song");
            }

            const newSong = await response.json();
            onAdd(newSong); // Notificar al componente padre
            setSuccessMessage("Song added successfully!");
            setFormData({
                title: "",
                album: "",
                year: "",
                cover: null,
                song_file: null,
                artists: "",
                genres: "",
            });
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        isOpen && (
            <div className="modal is-active">
                <div className="modal-background" onClick={onClose}></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Add New Song</p>
                        <button className="delete" aria-label="close" onClick={onClose}></button>
                    </header>
                    <section className="modal-card-body">
                        <form onSubmit={handleSubmit}>
                            {error && <p className="help is-danger">{error}</p>}
                            {successMessage && <p className="help is-success">{successMessage}</p>}
                            <div className="field">
                                <label className="label">Title:</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Album:</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        name="album"
                                        value={formData.album}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Year:</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="number"
                                        name="year"
                                        value={formData.year}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Artists:</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        name="artists"
                                        value={formData.artists}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Genres:</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="text"
                                        name="genres"
                                        value={formData.genres}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Cover:</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="file"
                                        name="cover"
                                        accept="image/*"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Song File:</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="file"
                                        name="song_file"
                                        accept="audio/*"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <button className="button is-primary" type="submit">
                                    Add Song
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        )
    );
}

export default AddSongModal;
