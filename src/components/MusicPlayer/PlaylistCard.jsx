import React from 'react';
import { Link } from 'react-router-dom';


const PlaylistCard = ({ playlist }) => {

  const coverImage = playlist.cover || '/path/to/default-cover.jpg'; // Fallback image path
  const title = playlist.title || 'Untitled Playlist';
  const artist = playlist.artist || 'Unknown Artist';
  const description = playlist.description || 'No description available';

  return (
    <div className="card has-shadow is-hovered">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={coverImage} alt={`Cover for ${title}`} className="cover-image" />
          <div className="play-overlay">
            <image size={48} color="white" />
          </div>
        </figure>
      </div>
      <div className="card-content">
        <p className="title is-4">{title}</p>
        {artist && <p className="subtitle is-6">by {artist}</p>}
        <p className="content">{description}</p>
      </div>
      <footer className="card-footer">
        <Link to={`/CreatePlayListModal/${playlist.id}`} className="card-footer-item">View Playlist</Link>
      </footer>
    </div>
  );
};

export default PlaylistCard;
