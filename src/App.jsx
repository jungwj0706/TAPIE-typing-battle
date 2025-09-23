import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage.jsx';
import NameInputPage from './pages/NameInputPage/NameInputPage.jsx';
// import GameSelectPage from './pages/ModeSelectPage/ModeSelectPage.jsx';
// import WordGamePage from './pages/GamePage/WordGamePage.jsx';
// import SentenceGamePage from './pages/GamePage/SentenceGamePage.jsx';
// import RankingPage from './pages/RankingPage/RankingPage.jsx';

export default function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/name" element={<NameInputPage />} />
        {/* <Route path="/select" element={<GameSelectPage />} /> */}
        {/* <Route path="/game/word" element={<WordGamePage />} /> */}
        {/* <Route path="/game/sentence" element={<SentenceGamePage />} /> */}
        {/* <Route path="/ranking" element={<RankingPage />} /> */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}