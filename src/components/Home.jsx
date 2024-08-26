import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../components/contexts/AuthContext';
import SongCard from '../components/MusicPlayer/SongCard';
import AlbumCard from '../components/MusicPlayer/AlbumCard'; // Ensure this component exists

const HomePage = (song_id) => {
  const { token } = useAuth("state");
  const [featuredAlbums, setFeaturedAlbums] = useState([]);
  const [recentSongs, setRecentSongs] = useState([]);
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedAlbums = async () => {
      try {
        const response = await axios.get('https://sandbox.academiadevelopers.com/harmonyhub/albums/', {
          headers: { Authorization: `Token ${token}` }
        });
        setFeaturedAlbums(response.data.results);
      } catch (error) {
        console.error("Error fetching featured albums:", error);
        setError("Error fetching featured albums");
      }
    };

    const fetchRecentSongs = async () => {
      try {
        const response = await axios.get('https://sandbox.academiadevelopers.com/harmonyhub/songs/?order_by=created_at/', {
          headers: { Authorization: `Token ${token}` }
        });
        setRecentSongs(response.data.results);
      } catch (error) {
        console.error("Error fetching recent songs:", error);
        setError("Error fetching recent songs");
      }
    };

    const fetchRecommendedSongs = async () => {
      try {
        const response = await axios.get('https://sandbox.academiadevelopers.com/harmonyhub/songs/?${query}', {
          headers: { Authorization: `Token ${token}` }
        });
        setRecommendedSongs(response.data.results);
      } catch (error) {
        console.error("Error fetching recommended songs:", error);
        setError("Error fetching recommended songs");
      }
    };

    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchFeaturedAlbums(),
          fetchRecentSongs(),
          fetchRecommendedSongs()
        ]);
      } catch {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <p className="has-text-centered">Loading...</p>;
  if (error) return <p className="has-text-centered">Error: {error}</p>;

  return (
    <div>
      <section className="section">
        <div className="container">
          <h1 className="title has-text-centered mb-4">
            Bienvenido a la Aplicación de Música
          </h1>
          <div className="columns is-centered">
            <div className="column is-half">
              <p className="subtitle has-text-centered mb-4">
                Explora nuestra colección de canciones, crea listas de reproducción y disfruta de la mejor música.
              </p>
              <div className="columns is-centered">
                <div className="column is-half">
                  <a className="button is-primary is-fullwidth" href={`/songs`}>
                    Ver Playlists
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {featuredAlbums.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="subtitle">Álbumes Destacados</h2>
            <div className="columns is-multiline">
              {featuredAlbums.map(album => (
                <div className="column is-one-third" key={album.id}>
                  <AlbumCard album={album} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {recentSongs.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="subtitle">Canciones Recientemente Reproducidas</h2>
            <div className="columns is-multiline">
              {recentSongs.map(song => (
                <div className="column is-one-third" key={song.id}>
                  <SongCard song={song} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {recommendedSongs.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="subtitle">Recomendados para Ti</h2>
            <div className="columns is-multiline">
              {recommendedSongs.map(song => (
                <div className="column is-one-third" key={song.id}>
                  <SongCard song={song} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;
