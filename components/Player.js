import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

const tracks = [
  {
    title: 'Title 1',
    artist: 'Artist 1',
    url: 'https://res.cloudinary.com/dwq30zq8e/video/upload/v1637534672/Nujubes/Nujabes_-_Winter_Lane_Remix_y1cnlf.mp3',
    duration: '3:30',
  },
  {
    title: 'Title 2',
    artist: 'Artist 2',
    url: 'https://res.cloudinary.com/dwq30zq8e/video/upload/v1635017502/musica/9th_Wonder_-_Make_Your_Move_Remix_Instrumental_q1trpk.mp3',
    duration: '3:30',
  },
];

const Player = () => {
  const audioRef = useRef(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentTrack = tracks[currentTrackIndex];

  const handleToggle = () => {
    if (isPlaying) {

      audioRef.current.pause();
    } else {
      audioRef.current.play();

    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    const currentTime = audio.currentTime;
    const duration = audio.duration || 0;
    const progressPercent = (currentTime / duration) * 100;
    setProgress(progressPercent);
    setCurrentTime(currentTime);
    setDuration(duration);
  };

  const handleTrackEnd = () => {
    // Check if there are more tracks
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else {
      // All tracks have been played, stop the player
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setProgress(0);
      setIsPlaying(false);
    }
  };

  const onVolumeChange = (e) => {
    audioRef.current.volume = e.target.value;
  }
  const handleNextTrack = () => {
    if (currentTrackIndex < tracks.length - 1) {
      setIsPlaying(false);
      audioRef.current.pause();
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setProgress(0);
      setIsPlaying(false);

    };


  }
  const handlePreviousTrack = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
      setIsPlaying(false);
      audioRef.current.pause()
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setProgress(0);
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    setIsPlaying(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setProgress(0);
  }

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = new Audio(currentTrack.url);
    audioRef.current = audio;

    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [currentTrack]);

  return (
    <div>

      <p>{currentTrack.title} - {currentTrack.artist}</p>
      <audio ref={audioRef} src={currentTrack.url} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleTimeUpdate} onEnded={handleTrackEnd} />
      <label>Volume</label>
      <input type="range" min="0" max="1" step="0.01" onChange={onVolumeChange} />
      <div>
        <button onClick={handleNextTrack}><Image src="/images/forward.png" width={50} height={50} /></button>
        <button onClick={handlePreviousTrack}> <Image src="/images/previous.png" width={50} height={50} />
        </button>
        <button onClick={handleToggle}>{isPlaying ? <Image src="/images/pause.png" width={50} height={50} />
          : <Image src="/images/play.png" width={50} height={50} />}</button>
        <button onClick={handleStop}> <Image src="/images/stop.png" width={50} height={50} />
        </button>
      </div>
      <div>
        <span >{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
      </div>
      <progress value={progress} max='100' />

    </div>
  );
};

export default Player;
