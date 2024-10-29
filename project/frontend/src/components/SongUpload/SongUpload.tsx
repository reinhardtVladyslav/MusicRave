import React, {useState} from 'react';
import style from './SongUpload.module.scss';
import Input from "../Input/Input";
import Button from "../Button/Button";
import UploadAndDisplayImage from "../UploadAndDisplayImage/UploadAndDisplayImage";
import UploadFileBtn from "../UploadFileBtn/UploadFileBtn";
import Dropdown from "../Dropdown/Dropdown";

interface Props {
    setIsModalOpen: (isOpen: boolean) => void;
}

const SongUpload: React.FC<Props> = ({setIsModalOpen}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [trackName, setTrackName] = useState<string>('');
    const [artists, setArtists] = useState<string>('');
    const [selectedAlbum, setSelectedAlbum] = useState('');

    const handleSubmit = async () => {
        if (!trackName || !artists || !selectedAlbum || !selectedFile) {
            alert('Please fill in all fields and upload a file.');
            return;
        }

        const formData = new FormData();
        formData.append('name', trackName);
        formData.append('author', artists);
        formData.append('album', selectedAlbum);
        formData.append('audio', selectedFile);

        try {
            const response = await fetch('http://localhost:8000/tracks/api/create_track/', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Track created successfully:', data);
                setIsModalOpen(false); // Close the modal on success
                window.location.reload();
            } else {
                const errorData = await response.json();
                console.error('Error creating track:', errorData);
                alert('Failed to create track. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
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
