import React, { useState } from 'react';
import styles from './Dropdown.module.scss';
import albums from '../../assets/data/albums.json';

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

    const toggleDropdown = () => setIsOpen(!isOpen);
    const selectAlbum = (album : Album) => {
        setSelect(album.name);
        setIsOpen(false);
    };

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
