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
                <Button text={'Create'} className={style.createBtn} onClick={() => setIsModalOpen(false)}/>
            </div>
        </div>
    );
};

export default SongUpload;
