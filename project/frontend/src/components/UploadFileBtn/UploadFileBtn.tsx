import React, {useRef} from 'react';
import styles from './UploadFileBtn.module.scss';
import FileSVG from "../../assets/svg/FileSVG";
import UploadSVG from "../../assets/svg/UploadSVG";

interface UploadFileBtnProps {
    setSelectedFile: (file: File | null) => void;
    selectedFile: File | null;
}

const UploadFileBtn : React.FC<UploadFileBtnProps>  = ({selectedFile, setSelectedFile}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className={styles.fileUpload}>
            {selectedFile ? (
                <div className={styles.fileInfo}>
                    <span className={styles.fileName}> <FileSVG/> {selectedFile.name}</span>
                    <button onClick={handleRemoveFile} className={styles.removeButton}>x</button>
                </div>
            ) : (
                <div className={styles.uploadBlock}>
                    <button onClick={handleButtonClick} className={styles.uploadButton}>
                        <UploadSVG/> Click To Upload
                    </button>
                    <span className={styles.uploadHint}>
                        Available formats: MP3, WAV
                    </span>
                </div>
            )}
            <input
                type="file"
                ref={fileInputRef}
                className={styles.hiddenInput}
                onChange={handleFileChange}
            />
        </div>
    );
};

export default UploadFileBtn;