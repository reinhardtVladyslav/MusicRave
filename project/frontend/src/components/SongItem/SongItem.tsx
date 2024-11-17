import React, { useEffect, useState } from 'react';
import style from './SongItem.module.scss';
// import music from '../../assets/data/music.json';

interface Song {
    id: number;
    name: string;
    author: string;
    album: string;
    duration: string;
    audio: string;
}

const SongItem: React.FC = () => {
    const [music, setSongs] = useState<Song[]>([]);
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const fetchSongs = async () => {
            const response = await fetch('http://localhost:8000/tracks/api/tracks/');
            const data = await response.json();
            setSongs(data);
        };

        fetchSongs();
    }, []);

    useEffect(() => {
        // Clean up audio on unmount
        return () => {
            if (audio) {
                audio.pause();
                audio.src = ""; // Від'єднуємо джерело
            }
        };
    }, [audio]);

    const playSong = (song: Song) => {
        try {
            // Якщо є активний аудіоелемент, зупиняємо його
            if (audio) {
                audio.pause();
                audio.src = ""; // Очищення попереднього джерела
            }

            // Створюємо новий аудіоелемент
            const newAudio = new Audio(song.audio);
            setAudio(newAudio);
            setCurrentSong(song);
            setIsPlaying(true);

            // Відтворюємо трек
            newAudio.play().catch((error) => {
                console.error("Помилка відтворення:", error);
                setIsPlaying(false);
            });

            // Ставимо флаг "isPlaying = false", якщо трек закінчився
            newAudio.onended = () => {
                setIsPlaying(false);
            };
        } catch (error) {
            console.error("Помилка під час запуску треку:", error);
        }
    };

    const togglePlayPause = () => {
        if (audio) {
            try {
                if (isPlaying) {
                    audio.pause();
                } else {
                    audio.play().catch((error) => {
                        console.error("Помилка під час відновлення відтворення:", error);
                    });
                }
                setIsPlaying(!isPlaying);
            } catch (error) {
                console.error("Помилка під час паузи/відтворення:", error);
            }
        }
    };

    const closeSong = () => {
        if (audio) {
            try {
                audio.pause();
                audio.currentTime = 0;
                audio.src = ""; // Очищення джерела аудіо
                setAudio(null);
                setIsPlaying(false);
                setCurrentSong(null);
            } catch (error) {
                console.error("Помилка при зупинці треку:", error);
            }
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
