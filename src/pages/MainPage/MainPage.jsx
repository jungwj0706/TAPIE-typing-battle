import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.modal.css';
import mainBg from '../../assets/main-bg.svg';
const MainPage = () => {
  const navigate = useNavigate();
  const handlePlayClick = () => {
    navigate('/game-select');
  };
  const handleRankClick = () => {
    navigate('/ranking');
  };
    return (
        <>
            <div className="main-page">
                <img src={mainBg} alt="Background" className="main-bg" />
                <div className="main-content flex-center flex-column">
                    <h1 className="main-title">Typing battle</h1>
                    <div className="main-buttons">
                        <button
                        onClick={handlePlayClick}
                        className="main-button primary"
                        >
                        PLAY
                        </button>
                        <button
                        onClick={handleRankClick}
                        className="main-button secondary"
                        >
                        RANK
                        </button>
                    </div>
                </div>
            </div>
        </>
  );
};
export default MainPage;