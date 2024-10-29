import React from 'react';
import style from './SongTable.module.scss';
import SongItem from "../SongItem/SongItem";
import ClockSVG from "../../assets/svg/ClockSVG";

const SongTable: React.FC = () => {
    return (
        <div className={style.songTable}>
            <div className={style.tableHeader}>
                <span>#</span>
                <span>Title</span>
                <span>Album</span>
                <ClockSVG />
            </div>

            <SongItem/>
        </div>
    );
};

export default SongTable;
