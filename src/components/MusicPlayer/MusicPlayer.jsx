import React, { useEffect } from "react";

function MusicPlayer({ song }) {
    useEffect(() => {
        if (song) {
            // Código para cargar y reproducir la canción
            console.log(`Reproduciendo: ${song.title}`);
            // Puedes utilizar un elemento de audio HTML5 o una librería como Howler.js para manejar la reproducción
        }
    }, [song]);

    if (!song) return <p>Selecciona una canción para reproducir.</p>;

    return (
        <div className="music-player">
            <h3>Reproduciendo ahora: {song.title}</h3>
            <p>Artista: {song.artists.join(", ")}</p>
            <p>Álbum: {song.album}</p>
            <audio controls src={song.song_file}>
                Tu navegador no soporta el elemento de audio.
            </audio>
        </div>
    );
}

export default MusicPlayer;
