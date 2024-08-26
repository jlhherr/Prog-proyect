import useFetch from "../hooks/useFetch";
import DeleteSongModal from "./DeleteSongModal";
import AddSongModal from "./AddSongModal"
import UpdateSongModal from "./UpdateSongModal";
import { useState } from "react";

function SongCard({ song, user_ID }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const { data, isLoading, isError, doFetch } = useFetch();
    const [songData, setSongData] = useState(song);
    
    const handleUpdate = (updatedSong) => {
        setSongData(updatedSong); // Update the song 
        console.log("Song updated: ", updatedSong);
    };
    const handleAddSong = (newSong) => {
        setSongData(newSong); // state with new song
        console.log("Song added: ", newSong);
    };

  
        return (
            <div className="card has-background-dark my-2 mx-1">
                <div className="card-image">
                    <figure className="image is-4by3">
                        <img src={songData.cover} alt={songData.title} className="cover-image" />
                    </figure>
                </div>
                <div className="card-content">
                    <div className="media">
                        <div className="media-content">
                            <p className="title is-4 has-text-white">{songData.title}</p>
                            <p className="subtitle is-6 has-text-light">{songData.artist}</p>
                            <p className="has-text-light">{songData.album}</p>
                            <p className="has-text-light">{songData.description}</p>
                        </div>
                    </div>
                    <div className="content">
                        <audio controls>
                            <source src={songData.song_file} type="audio/mpeg" />
                            Tu navegador no soporta el elemento de audio.
                        </audio>
                    </div>
                </div>
            {song.owner == user_ID && (
                <div className="columns">
                    <div className="column" onClick={() => setIsDeleteModalOpen(true)}>
                        <button className="button is-danger">Eliminar</button>
                    </div>
                    <div className="column" onClick={() => setIsUpdateModalOpen(true)}>
                        <button className="button is-primary">Editar</button>
                    </div>
                </div>
            )}
            {isDeleteModalOpen && (
                <DeleteSongModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    song_id={song.id}
                    onDelete={{ data, isLoading, isError, doFetch }}
                />
            ) }
            {isUpdateModalOpen && (
                <UpdateSongModal
                    isOpen={isUpdateModalOpen}
                    onClose={() => setIsUpdateModalOpen(false)}
                    song_id={song.id}
                    onUpdate={handleUpdate}
                />
            )}
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

export default SongCard;



/*import useFetch from "../hooks/useFetch";
import DeleteSongModal from "./DeleteSongModal";
import UpdateSongModal from "./UpdateSongModal";
import { useState } from "react";

function SongCard({ song, user_ID }) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const { data, isLoading, isError, doFetch } = useFetch();
    const [songData, setSongData] = useState(song);

    const handleUpdate = (updatedSong) => {
        setSongData(updatedSong); // Update the song data
        console.log("Song updated: ", updatedSong);
    };

    return (
        <div className="card has-background-dark my-2 mx-1">
            <div className="card-image">
                <figure className="image is-4by3">
                    <img src={songData.cover} alt={songData.title} className="cover-image" />
                </figure>
            </div>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-4 has-text-white">{songData.title}</p>
                        <p className="subtitle is-6 has-text-light">{songData.artist}</p>
                        <p className="has-text-light">{songData.album}</p>
                        <p className="has-text-light">{songData.description}</p>
                    </div>
                </div>
                <div className="content">
                    <audio controls>
                        <source src={songData.song_file} type="audio/mpeg" />
                        Tu navegador no soporta el elemento de audio.
                    </audio>
                </div>
            </div>
            {song.owner === user_ID && (
                <div className="card-footer">
                    <button
                        className="button is-danger is-outlined card-footer-item"
                        onClick={() => setIsDeleteModalOpen(true)}
                    >
                        Eliminar
                    </button>
                    <button
                        className="button is-primary is-outlined card-footer-item"
                        onClick={() => setIsUpdateModalOpen(true)}
                    >
                        Editar
                    </button>
                </div>
            )}
            {isDeleteModalOpen && (
                <DeleteSongModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    song_id={song.id}
                    onDelete={{ data, isLoading, isError, doFetch }}
                />
            )}
            {isUpdateModalOpen && (
                <UpdateSongModal
                    isOpen={isUpdateModalOpen}
                    onClose={() => setIsUpdateModalOpen(false)}
                    song_id={song.id}
                    onUpdate={handleUpdate}
                />
            )}
        </div>
    );
}

export default SongCard;*/
