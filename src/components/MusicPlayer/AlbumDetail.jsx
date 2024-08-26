import React from 'react';

const DetailPage = ({ type, details }) => {
  const { name, songs } = details; 

  return (
    <div>
      <h1>{name} ({type})</h1>
      <div>
        {songs.map((song) => (
          <div key={song.id}>
            <span>{song.title}</span>
            <button onClick={() => console.log('Playing', song.title)}>Play</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailPage;
