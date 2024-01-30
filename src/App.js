import React, { useState, useEffect } from 'react';

const App = () => {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [audioRef, setAudioRef] = useState(null);

  useEffect(() => {
    // Load last playing audio file and continue playing
    const lastPlayedIndex = localStorage.getItem('lastPlayedIndex');
    if (lastPlayedIndex) {
      setCurrentTrackIndex(parseInt(lastPlayedIndex, 10));
    }
  }, []);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const newPlaylist = [...playlist];

    for (let i = 0; i < files.length; i++) {
      newPlaylist.push({
        name: files[i].name,
        url: URL.createObjectURL(files[i]),
      });
    }

    setPlaylist(newPlaylist);
  };

  const handlePlay = (index) => {
    setCurrentTrackIndex(index);
    localStorage.setItem('lastPlayedIndex', index.toString());
  };

  const handleEnded = () => {
    // Play the next track in the playlist
    if (currentTrackIndex + 1 < playlist.length) {
      handlePlay(currentTrackIndex + 1);
    }
  };

  return (
    <div>
      <input type="file" accept="audio/*" multiple onChange={handleFileChange} />
      <div>
        <h2>Playlist</h2>
        <ul>
          {playlist.map((track, index) => (
            <li key={index}>
              <button onClick={() => handlePlay(index)}>{track.name}</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Now Playing</h2>
        <audio
          ref={(audio) => setAudioRef(audio)}
          src={playlist[currentTrackIndex]?.url}
          controls
          onEnded={handleEnded}
        />
      </div>
    </div>
  );
};

export default App;

