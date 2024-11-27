import style from "../../App.module.scss";
import React from "react";
import Navigation from "../Navigation/Navigation";

const Market = () => {
    return (
        <div className={style.App}>
            <Navigation/>
            <div className={style.mainContent}>
                <h1>Market</h1>
            </div>
        </div>
    );
};

export default Market;
