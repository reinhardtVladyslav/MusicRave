import React, { useState, useEffect } from 'react';
import style from './SongUpload.module.scss';
import Input from "../Input/Input";
import Button from "../Button/Button";
import UploadAndDisplayImage from "../UploadAndDisplayImage/UploadAndDisplayImage";
import UploadFileBtn from "../UploadFileBtn/UploadFileBtn";
import Dropdown from "../Dropdown/Dropdown";

interface Props {
    setIsModalOpen: (isOpen: boolean) => void;
}

const SongUpload: React.FC<Props> = ({ setIsModalOpen }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [trackName, setTrackName] = useState<string>('');
    const [artists, setArtists] = useState<string>('');
    const [selectedAlbum, setSelectedAlbum] = useState('');

    useEffect(() => {
        // Забороняємо скролінг при відкритті модального вікна
        document.body.style.overflow = 'hidden';

        // Відновлюємо скролінг при закритті компонента
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);


    const handleSubmit = async () => {
        if (!trackName || !selectedFile || !selectedAlbum) {
            alert('Please fill all required fields.');
            return;
        }

        const user_id = sessionStorage.getItem('user_id');

        if (!user_id) {
            alert('User not logged in');
            return;
        }

        const formData = new FormData();
        formData.append("title", trackName);
        formData.append("authors", artists);
        formData.append("album", selectedAlbum);
        formData.append("audio", selectedFile);
        formData.append("user_id", user_id);

        try {
            const response = await fetch('http://127.0.0.1:8000/tracks/add/', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                // Handle success
                console.log('Track added successfully:', data.track);
                setIsModalOpen(false);  // Close modal after successful submission
                window.location.reload();
            } else {
                // Handle error
                alert(data.error || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while uploading the track');
        }
    };

    return (
        <div className={style.songUpload}>
            <UploadAndDisplayImage/>
            <Input label="Track's Name" id="trackName" value={trackName} setValue={setTrackName}/>
            <Input label="Artists" id="genre" value={artists} setValue={setArtists}/>
            <small className={style.helpText}>Include all who contributed</small>
            <Dropdown setSelect={setSelectedAlbum} value={selectedAlbum} />
            <UploadFileBtn selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
            <label className={style.checkboxSection}>
                <input className={style.checkbox} type="checkbox"/>
                <span className={style.text}>
                    I confirm that I own the rights to this track and have permission to publish it.
                </span>
            </label>
            <div className={style.actionButtons}>
                <Button text={'Cancel'} className={style.cancelBtn} onClick={() => setIsModalOpen(false)}/>
                <Button text={'Create'} className={style.createBtn} onClick={handleSubmit} />
            </div>
        </div>
    );
};

export default SongUpload;
