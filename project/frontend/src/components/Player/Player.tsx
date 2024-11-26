import React, { useEffect, useState, useRef } from 'react';
import style from './Player.module.scss';
import PauseSVG from '../../assets/svg/PauseSVG';
import PlaySVG from '../../assets/svg/PlaySVG';
import PrevSVG from '../../assets/svg/PrevSVG';
import NextSVG from '../../assets/svg/NextSVG';

interface Song {
    id: number;
    name: string;
    author: string;
    album: string;
    duration: string;
    audio: string;
    image?: string;
}

interface PlayerProps {
    currentSong: Song | null;
    isPlaying: boolean;
    togglePlayPause: (isPlaying: boolean) => void;
    nextSong: () => void;
    prevSong: () => void;
    currentIndex: number | null;
    musicLength: number;
}

const Player: React.FC<PlayerProps> = ({ currentSong, isPlaying, togglePlayPause, nextSong, prevSong, currentIndex, musicLength }) => {
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (currentSong) {
            if (!audioRef.current) {
                audioRef.current = new Audio(currentSong.audio);
            } else if (audioRef.current.src !== currentSong.audio) {
                audioRef.current.pause();
                audioRef.current.src = currentSong.audio;
                audioRef.current.load();
            }

            const audio = audioRef.current;

            if (isPlaying) {
                audio.play().catch((err) => console.error(err));
            } else {
                audio.pause();
            }

            const updateTime = () => setCurrentTime(audio.currentTime);
            const updateDuration = () => setDuration(audio.duration);

            // Додаємо події
            audio.addEventListener('timeupdate', updateTime);
            audio.addEventListener('loadedmetadata', updateDuration);

            // Обробник завершення треку
            audio.onended = () => {
                nextSong(); // Викликаємо функцію для переходу до наступної пісні
            };

            return () => {
                audio.removeEventListener('timeupdate', updateTime);
                audio.removeEventListener('loadedmetadata', updateDuration);
                audio.onended = null; // Видаляємо обробник завершення треку
            };
        }
    }, [currentSong, isPlaying, nextSong]);

    const handlePlayPause = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch((err) => console.error("Error resuming playback:", err));
        }

        togglePlayPause(!isPlaying);
    };

    const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            const newTime = Number(event.target.value);
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    const isPrevDisabled = currentIndex === 0;
    const isNextDisabled = currentIndex === musicLength - 1;

    if (!currentSong) return null;

    return (
        <div className={style.audioPlayer}>
            <div className={style.contentWrapper}>
                <div className={style.songInfo}>
                    <img
                        src={currentSong.image || '/default-cover.png'}
                        alt={currentSong.name}
                        className={style.songImage}
                    />
                    <div className={style.songDetails}>
                        <span className={style.songTitle}>{currentSong.name}</span>
                        <span className={style.songAuthor}>{currentSong.author}</span>
                    </div>
                </div>
                <div className={style.controls}>
                    <button
                        onClick={prevSong}
                        className={`${style.controlButton} ${isPrevDisabled ? style.disabled : ''}`}
                        disabled={isPrevDisabled}
                    >
                        <PrevSVG />
                    </button>
                    <button onClick={handlePlayPause} className={style.controlButton}>
                        {isPlaying ? <PauseSVG /> : <PlaySVG />}
                    </button>
                    <button
                        onClick={nextSong}
                        className={`${style.controlButton} ${isNextDisabled ? style.disabled : ''}`}
                        disabled={isNextDisabled}
                    >
                        <NextSVG />
                    </button>
                </div>
                <div className={style.progressContainer}>
                    <span className={style.currentTime}>{formatTime(currentTime)}</span>
                    <input
                        type="range"
                        className={style.progressBar}
                        min="0"
                        max={duration.toString()}
                        value={currentTime}
                        onChange={handleSeek}
                    />
                    <span className={style.totalDuration}>{formatTime(duration)}</span>
                </div>
            </div>
        </div>
    );
};

export default Player;
