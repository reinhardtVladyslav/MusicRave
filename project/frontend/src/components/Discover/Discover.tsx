import React, {useState} from "react";
import style from '../../App.module.scss';
import SongTable from "../SongTable/SongTable";
import Button from "../Button/Button";
import SongUpload from "../SongUpload/SongUpload";

const Discover: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className={`${style.App} ${isModalOpen ? style.modalActive : ''}`}>
            <header className={style.appHeader}>
                <h1 className={style.title}>Discover</h1>
                <Button text={'New Track'} onClick={() => setIsModalOpen(true)}/>
            </header>

            <SongTable/>
            {isModalOpen && <SongUpload setIsModalOpen={setIsModalOpen}/>}

        </div>
    );
};

export default Discover;
