import { useState } from "react";
import EditArtistModal from "../MusicPlayer/EditArtistModal";
import DeleteArtistModal from "../MusicPlayer/DeleteArtistModal";

function ArtistCard({ artist, user_ID, onUpdate, onDelete }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [artistData, setArtistData] = useState(artist);

    const handleUpdate = (updatedArtist) => {
        setArtistData(updatedArtist); 
        if (onUpdate) {
            onUpdate(updatedArtist); 
    };

    const handleDeleteArtist = () => {
        if (onDelete) {
            onDelete(artist.id); 
        }
    };

    return (
        <div className="card has-background-dark my-2 mx-2">
            <div className="card-image">
                <figure className="image is-4by3">
                    <img src={artistData.image_url || '/path/to/default-image.jpg'} alt={artistData.name} />
                </figure>
            </div>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-4 has-text-white">{artistData.name}</p>
                    </div>
                </div>
                <div className="content has-text-white">
                    {artistData.description || 'No description available'}
                </div>
            </div>
            {artist.owner === user_ID && (
                <div className="card-footer">
                    <button className="button is-primary is-fullwidth" onClick={() => setIsEditModalOpen(true)}>
                        Editar
                    </button>
                    <button className="button is-danger is-fullwidth mt-2" onClick={() => setIsDeleteModalOpen(true)}>
                        Eliminar
                    </button>
                </div>
            )}
            {isEditModalOpen && (
                <EditArtistModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    artist_id={artist.id}
                    onUpdate={handleUpdate}
                />
            )}
            {isDeleteModalOpen && (
                <DeleteArtistModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    artist_id={artist.id}
                    onDelete={handleDeleteArtist}
                />
            )}
        </div>
    );
}
}
export default ArtistCard;
