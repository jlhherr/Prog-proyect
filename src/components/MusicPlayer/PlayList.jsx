import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Ensure the import path is correct
import PlaylistCard from './PlaylistCard'; // Make sure you have this component
import CreatePlaylistModal from '..//CreatePlayListModal'; // Ensure this component exists

const PlaylistsList = () => {
    const [playlists, setPlaylists] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({
        name: '',
        description: '',
        public: '',
        owner: '',
        created_at_min: '',
        created_at_max: '',
        updated_at_min: '',
        updated_at_max: '',
        ordering: 'created_at',
        page_size: 5
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { token } = useAuth("state");

    const fetchPlaylists = async () => {
        setIsLoading(true);
        setIsError('');

        const query = new URLSearchParams({
            ...filters,
            page,
            page_size: filters.page_size
        }).toString();

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/harmonyhub/playlists/?${query}`, {
                headers: {
                    Authorization: `Token ${token}`,
                }
            });
            const data = await response.json();

            if (response.ok) {
                setPlaylists(data.results);
                setTotalPages(Math.ceil(data.count / filters.page_size));
            } else {
                setIsError('Failed to fetch playlists');
            }
        } catch (error) {
            console.error('Error fetching playlists:', error);
            setIsError('Error fetching playlists. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPlaylists();
    }, [page, filters]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCreatePlaylist = (newPlaylist) => {
        setPlaylists(prevPlaylists => [newPlaylist, ...prevPlaylists]);
        handleCloseModal();
    };

    if (isLoading) return <p>Loading playlists...</p>;
    if (isError) return <p>{isError}</p>;

    return (
        <section className="section">
            <div className="container">
                <h2 className="subtitle">Playlists</h2>

                {/* Button to create a new playlist */}
                <button className="button is-primary" onClick={handleOpenModal}>
                    Create New Playlist
                </button>

                {/* Filter Inputs */}
                <div className="filters">
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                name="name"
                                value={filters.name}
                                onChange={handleFilterChange}
                                placeholder="Search by name"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Description</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                name="description"
                                value={filters.description}
                                onChange={handleFilterChange}
                                placeholder="Search by description"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Public</label>
                        <div className="control">
                            <select
                                className="input"
                                name="public"
                                value={filters.public}
                                onChange={handleFilterChange}
                            >
                                <option value="">All</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Owner</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                name="owner"
                                value={filters.owner}
                                onChange={handleFilterChange}
                                placeholder="Search by owner"
                            />
                        </div>
                    </div>
                    {/* Additional filters can be added as needed */}
                </div>

                {playlists.length > 0 ? (
                    <>
                        <div className="columns is-multiline">
                            {playlists.map(playlist => (
                                <div className="column is-one-third" key={playlist.id}>
                                    <PlaylistCard playlist={playlist} />
                                </div>
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        <div className="pagination">
                            <button
                                className="button"
                                onClick={() => handlePageChange(page - 1)}
                                disabled={page === 1}
                            >
                                Previous
                            </button>
                            <span>Page {page} of {totalPages}</span>
                            <button
                                className="button"
                                onClick={() => handlePageChange(page + 1)}
                                disabled={page === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </>
                ) : (
                    <p>No playlists available.</p>
                )}
            </div>

            {/* Render the Create Playlist Modal */}
            <CreatePlaylistModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onCreate={handleCreatePlaylist}
            />
        </section>
    );
};

export default PlaylistsList;
