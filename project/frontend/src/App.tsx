import React, {useState} from 'react';
import style from './App.module.scss';
import SongTable from "./components/SongTable/SongTable";
import SongUpload from "./components/SongUpload/SongUpload";
import Button from "./components/Button/Button";

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className={`${style.App} ${isModalOpen ? style.modalActive : ''}`}>
            <header className={style.appHeader}>
                <h1 className={style.title}>Discover</h1>
                <Button text={'New Track'} onClick={() => setIsModalOpen(true)} />
            </header>

            <SongTable/>
            {isModalOpen && <SongUpload setIsModalOpen={setIsModalOpen}/>}
        </div>
    );
}

export default App;
