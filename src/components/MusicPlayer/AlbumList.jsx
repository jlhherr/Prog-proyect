import React, { useEffect, useState } from 'react';
import AlbumCard from './AlbumCard';
import { useAuth } from '../contexts/AuthContext';
import AddAlbumModal from '../MusicPlayer/AddAlbumModal'; // Adjust the import path if necessary

const AlbumList = () => {
  const [featuredAlbums, setFeaturedAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { token } = useAuth("state"); // Retrieve the auth token
  const [page, setPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1); // Total pages for pagination
  const [filters, setFilters] = useState({
    title: '',
    year: '',
    created_at_min: '',
    created_at_max: '',
    updated_at_min: '',
    updated_at_max: '',
    page_size: 5
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchFeaturedAlbums = async () => {
    setIsLoading(true);
    setIsError(false);

    const query = new URLSearchParams({
      ...filters,
      page,
    }).toString();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/harmonyhub/albums/?${query}`, {
        headers: {
          'Authorization': `Token ${token}`,
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch albums');
      }

      const data = await response.json();
      setFeaturedAlbums(data.results);
      setTotalPages(Math.ceil(data.count / filters.page_size));
    } catch (error) {
      console.error("Failed to fetch albums:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedAlbums();
  }, [page, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleAddAlbum = (newAlbum) => {
    setFeaturedAlbums((prevAlbums) => [newAlbum, ...prevAlbums]); // Add the new album to the list
    setIsModalOpen(false); // Close the modal
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (isError) return <p>Error loading featured albums.</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="section">
      <div className="container">
        <h2 className="subtitle">Álbumes Destacados</h2>

        {/* Filter Inputs */}
        <div className="filters">
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="title"
                value={filters.title}
                onChange={handleFilterChange}
                placeholder="Search by title"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Year</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="year"
                value={filters.year}
                onChange={handleFilterChange}
                placeholder="Search by year"
              />
            </div>
          </div>
          {/* Add additional filters as needed */}
        </div>

        {/* Add Album Button */}
        <div className="buttons">
          <button className="button is-primary" onClick={openModal}>
            Add Album
          </button>
        </div>

        {/* Display Albums */}
        {featuredAlbums.length > 0 ? (
          <>
            <div className="columns is-multiline">
              {featuredAlbums.map((album) => (
                <div className="column is-one-third" key={album.id}>
                  <AlbumCard album={album} />
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
          <p>No featured albums available.</p>
        )}
      </div>

      {/* Add Album Modal */}
      <AddAlbumModal isOpen={isModalOpen} onClose={closeModal} onAdd={handleAddAlbum} />
    </section>
  );
};

export default AlbumList;
