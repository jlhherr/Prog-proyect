import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { useAuth } from "../contexts/AuthContext";

function UpdateSongModal({ isOpen, onClose, song_id, onUpdate }) {
    const { token } = useAuth("state");
    const { data, isLoading, isError, doFetch } = useFetch();
    const [formData, setFormData] = useState({
        title: "",
        album: "",
        year: "",
        cover: null,
        song_file: null,
    });

    useEffect(() => {
        if (song_id) {
            // Fetch the song details when song_id changes
            doFetch(`${import.meta.env.VITE_API_BASE_URL}/harmonyhub/songs/${song_id}/`, {
                method: "GET",
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
        }
    }, [song_id]);

    useEffect(() => {
        if (data) {
            setFormData({
                title: data.title || "",
                album: data.album || "",
                year: data.year || "",
                cover: null,
                song_file: null,
            });
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

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

        doFetch(`${import.meta.env.VITE_API_BASE_URL}/harmonyhub/songs/${song_id}/`, {
            method: "PUT",
            headers: {
                Authorization: `Token ${token}`,
            },
            body: formPayload,
        })
        .then((updatedData) => {
            onUpdate(updatedData); // Notify parent component of the update
            onClose();
        })
        .catch((error) => {
            console.error("Error updating song:", error);
        });
    };

    return (
        isOpen && (
            <div className="modal is-active">
                <div className="modal-background" onClick={onClose}></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Update Song: {formData.title}</p>
                        <button className="delete" aria-label="close" onClick={onClose}></button>
                    </header>
                    <section className="modal-card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="field">
                                <label className="label">Title:</label>
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
                                <label className="label">Album:</label>
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
                                <label className="label">Year:</label>
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
                                    Update
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        )
    );
}

export default UpdateSongModal;
