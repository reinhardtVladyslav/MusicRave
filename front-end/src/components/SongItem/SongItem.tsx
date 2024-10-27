import React, {useEffect, useState} from 'react';
import style from './SongItem.module.scss';
import music from '../../assets/data/music.json';

interface Song {
    id: number;
    name: string;
    author: string;
    album: string;
    duration: string;
    audio: string;
}

const SongItem: React.FC = () => {
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        // Clean up audio on unmount
        return () => {
            if (audio) {
                audio.pause();
            }
        };
    }, [audio]);

    const playSong = (song: Song) => {
        // Stop any currently playing song
        if (audio) {
            audio.pause();
        }

        // Set new audio instance
        const newAudio = new Audio(song.audio);
        setAudio(newAudio);
        setCurrentSong(song);
        setIsPlaying(true);
        newAudio.play();

        newAudio.onended = () => {
            setIsPlaying(false);
        };
    };

    const togglePlayPause = () => {
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const closeSong = () => {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
            setIsPlaying(false);
            setCurrentSong(null);
        }
    };

    return (
        <>
            {music.map((song: Song) => (
                <div
                    key={song.id}
                    className={style.tableRow}
                    onClick={() => playSong(song)}
                >
                    <span className={style.number}>{song.id}</span>
                    <div className={style.title}>
                        <span className={style.songTitle}>{song.name}</span>
                        <span className={style.author}>{song.author}</span>
                    </div>
                    <span className={style.album}>{song.album}</span>
                    <span className={style.duration}>{song.duration}</span>
                </div>
            ))}

            {currentSong && (
                <div className={style.audioPlayer}>
                    <span className={style.nowPlaying}>
                        Now Playing: {currentSong.name} by {currentSong.author}
                    </span>
                    <div className={style.controls}>
                        <button onClick={togglePlayPause} className={style.controlButton}>
                            {isPlaying ? 'Pause' : 'Play'}
                        </button>
                        <button onClick={closeSong} className={style.controlButton}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default SongItem;