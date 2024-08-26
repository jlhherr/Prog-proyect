

import React, { useEffect, useState, useRef } from "react";
import SongCard from "./SongCard";
import AddSongModal from "./AddSongModal"; // Importa el modal de agregar canción
import { useAuth } from "../contexts/AuthContext";

function SongList() {
    const [page, setPage] = useState(1);
    const [songs, setSongs] = useState([]);
    const [nextUrl, setNextUrl] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState({});
    const [isAddModalOpen, setIsAddModalOpen] = useState(false); 

    const { user__id } = useAuth("state");

    const observerRef = useRef();
    const lastSongElementRef = useRef();

    const doFetch = async () => {
        setIsLoading(true);
        let query = new URLSearchParams({
            page: page,
            page_size: 5,
            ordering: `-created_at`,
            ...filters,
        }).toString();

        fetch(
            `${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/?${query}`,
            {}
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.results) {
                    setSongs((prevSongs) => [...prevSongs, ...data.results]);
                    setNextUrl(data.next);
                }
            })
            .catch(() => {
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        doFetch();
    }, [page, filters]);

    useEffect(() => {
        if (isLoading) return;
        if (observerRef.current) {
            observerRef.current.disconnect();
        }
        observerRef.current = new IntersectionObserver((cards) => {
            if (cards[0].isIntersecting && nextUrl) {
                setPage((prevPage) => prevPage + 1);
            }
        });
        if (lastSongElementRef.current) {
            observerRef.current.observe(lastSongElementRef.current);
        }
    }, [isLoading, nextUrl]);

    function handleSearch(event) {
        event.preventDefault();
        const searchForm = new FormData(event.target);
        const newFilters = {};
        searchForm.forEach((value, key) => {
            if (value) {
                newFilters[key] = value;
            }
        });
        setFilters(newFilters);
        setSongs([]);
        setPage(1);
    }

    function handleAddSong(newSong) {
        setSongs((prevSongs) => [newSong, ...prevSongs]); // Agrega la nueva canción al principio de la lista
        setIsAddModalOpen(false); // Cierra el modal
    }

    if (isError) return <p>Error al cargar las canciones.</p>;
    if (!songs.length && !isLoading) return <p>No hay canciones disponibles</p>;


    return (
        <div>
            <div className="my-5">
                <h2 className="title">Lista de Canciones</h2>
                <button
                    className="button is-link mb-4"
                    onClick={() => setIsAddModalOpen(true)}
                >
                    Agregar Canción
                </button>
                <form className="box" onSubmit={handleSearch}>
                    <div className="field">
                        <label className="label">Título:</label>
                        <div className="control">
                            <input className="input" type="text" name="title" />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Artista:</label>
                        <div className="control">
                            <input
                                className="input"
                                type="number"
                                name="artists"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Fecha de inicio:</label>
                        <div className="control">
                            <input
                                className="input"
                                type="datetime-local"
                                name="created_at_min"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Fecha de fin:</label>
                        <div className="control">
                            <input
                                className="input"
                                type="datetime-local"
                                name="created_at_max"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <button className="button is-primary" type="submit">
                            Buscar
                        </button>
                    </div>
                </form>
                <div className="columns is-multiline">
                    {songs.map((song, index) => (
                        <div
                            key={song.id}
                            ref={songs.length === index + 1 ? lastSongElementRef : null}
                            className="column is-one-third"
                        >
                            <SongCard song={song} user_ID={user__id} />
                        </div>
                    ))}
                </div>
                {isLoading && <p>Cargando más canciones...</p>}
            </div>
            {isAddModalOpen && (
                <AddSongModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    onAdd={handleAddSong}
                />
            )}
        </div>
    );
}

export default SongList;