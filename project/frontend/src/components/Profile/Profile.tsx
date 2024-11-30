import style from "../../App.module.scss";
import React from "react";
import Navigation from "../Navigation/Navigation"; // Імпорт навігації

const Profile = () => {
    return (
        <div className={style.App}>
            <Navigation/>
            <div className={style.mainContent}>
                <h1>Profile</h1>
            </div>
        </div>
    );
};

export default Profile;
