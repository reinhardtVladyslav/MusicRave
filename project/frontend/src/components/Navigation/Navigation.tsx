import React from 'react';
import './Navigation.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeSVG from '../../assets/svg/HomeSVG';
import MarketSVG from '../../assets/svg/MarketSVG';

const Navigation: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Отримуємо поточний маршрут

    return (
        <nav className="navigation">
            <div
                className={`menu-item ${location.pathname === '/discover' ? 'active' : ''}`}
                onClick={() => navigate('/discover')}
            >
                <i className="icon"><HomeSVG /></i>
                <span>Home</span>
            </div>

            <div
                className={`menu-item ${location.pathname === '/market' ? 'active' : ''}`}
                onClick={() => navigate('/market')}
            >
                <i className="icon"><MarketSVG /></i>
                <span>Market</span>
            </div>

            <div
                className={`profile ${location.pathname === '/profile' ? 'active' : ''}`}
                onClick={() => navigate('/profile')}
            >
                <img
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    alt="Profile"
                    className="profile-img"
                />
            </div>
        </nav>
    );
};

export default Navigation;
