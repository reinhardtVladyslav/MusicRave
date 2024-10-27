import React, { useState, useRef } from "react";
import style from "./UploadAndDisplayImage.module.scss";

const UploadAndDisplayImage = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleDivClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    return (
        <div className={style.uploadBlock}>
            {selectedImage ? (
                <div>
                    <img
                        alt="not found"
                        src={URL.createObjectURL(selectedImage)}
                        onClick={handleDivClick}
                        className={style.image}
                    />
                </div>
            ) : (
                <div onClick={handleDivClick}>
                    <span className={style.plusIcon}>+</span>
                </div>
            )}
            <input
                type="file"
                name="myImage"
                ref={inputRef}
                style={{ display: "none" }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (event.target.files && event.target.files[0]) {
                        console.log(event.target.files[0]);
                        setSelectedImage(event.target.files[0]);
                    }
                }}
            />
        </div>
    );
};

export default UploadAndDisplayImage;
