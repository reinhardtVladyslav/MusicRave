import React, { useEffect, useState } from 'react';
import style from './SongItem.module.scss';
import music from '../../assets/data/music.json';
import Player from '../Player/Player'; // Імпортуємо Player

interface Song {
    id: number;
    name: string;
    author: string;
    album: string;
    duration: string;
    audio: string;
    image?: string; // Додано для відображення зображення
}

const SongItem: React.FC = () => {
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const [currentIndex, setCurrentIndex] = useState<number | null>(null);

    // Відтворення треку
    const playSong = (song: Song, index: number) => {
        setCurrentSong(song);
        setCurrentIndex(index);
        setIsPlaying(true);
    };

    // Переключення паузи/відтворення
    const togglePlayPause = (newState: boolean) => {
        setIsPlaying(newState);
    };

    // Наступна пісня
    const nextSong = () => {
        if (currentIndex !== null && currentIndex < music.length - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentSong(music[nextIndex]);
            setCurrentIndex(nextIndex);
            setIsPlaying(true);
        }
    };

    // Попередня пісня
    const prevSong = () => {
        if (currentIndex !== null && currentIndex > 0) {
            const prevIndex = currentIndex - 1;
            setCurrentSong(music[prevIndex]);
            setCurrentIndex(prevIndex);
            setIsPlaying(true);
        }
    };

    return (
        <>
            {music.map((song: Song, index) => (
                <div
                    key={song.id}
                    className={style.tableRow}
                    onClick={() => playSong(song, index)}
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
                <Player
                    currentSong={currentSong}
                    isPlaying={isPlaying}
                    togglePlayPause={togglePlayPause}
                    nextSong={nextSong}
                    prevSong={prevSong}
                    currentIndex={currentIndex!}
                    musicLength={music.length}
                />
            )}
        </>
    );
};

export default SongItem;
