import React, { useEffect, useState } from 'react';
import styles from './Dropdown.module.scss';
// import albums from '../../assets/data/albums.json';

type Album = {
    id: number;
    name: string;
};

interface DropdownProps {
    setSelect: (name: string) => void;
    value: string;
}

const Dropdown: React.FC<DropdownProps> = ({setSelect, value}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [albums, setAlbums] = useState<Album[]>([]);

    const toggleDropdown = () => setIsOpen(!isOpen);
    const selectAlbum = (album : Album) => {
        setSelect(album.name);
        setIsOpen(false);
    };

    useEffect(() => {
        const fetchAlbums = async () => {
            const response = await fetch('http://localhost:8000/tracks/api/albums/');
            const data = await response.json();
            setAlbums(data);
        };

        fetchAlbums();
    }, []);

    return (
        <div className={styles.dropdown}>
            <div className={styles.selected} onClick={toggleDropdown}>
                <span>{value}</span>
                <span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
            </div>
            {isOpen && (
                <ul className={styles.options}>
                    {albums.map((album : Album) => (
                        <li
                            key={album.id}
                            onClick={() => selectAlbum(album)}
                            className={styles.option}
                        >
                            {album.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
