import React from 'react';

const AlbumCard = ({ album }) => {
 
  if (!album) {
    return null; 
  }

  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img 
            src={album.cover || 'path-to-default-image.jpg'} 
            alt={`Cover of ${album.title || 'Untitled Album'}`} 
            loading="lazy"
          />
        </figure>
      </div>
      <div className="card-content">
        <p className="title is-5">{album.title || 'Unknown Title'}</p>
        <p className="subtitle is-6">{album.year || 'Unknown Year'}</p>
      </div>
    </div>
  );
};

export default AlbumCard;
