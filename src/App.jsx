import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage.jsx';
import NameInputPage from './pages/NameInputPage.jsx';
import GameSelectPage from './pages/GameSelectPage.jsx';
import WordGamePage from './pages/WordGamePage.jsx';
import SentenceGamePage from './pages/SentenceGamePage.jsx';
import RankingPage from './pages/RankingPage.jsx';

export default function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<MainPage />} /> */}
      {/* <Route path="/name" element={<NameInputPage />} /> */}
      {/* <Route path="/select" element={<GameSelectPage />} /> */}
      <Route path="/game/word" element={<WordGamePage />} />
      <Route path="/game/sentence" element={<SentenceGamePage />} />
      {/* <Route path="/ranking" element={<RankingPage />} /> */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
