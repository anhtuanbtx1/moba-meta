import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoreMap from './pages/LoreMap';
import Factions from './pages/Factions';
import MetaList from './pages/MetaList';
import HeroDetail from './pages/HeroDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoreMap />} />
        <Route path="/meta" element={<MetaList />} />
        <Route path="/factions" element={<Factions />} />
        <Route path="/heroes" element={<HeroDetail />} />
        <Route path="/heroes/:slug" element={<HeroDetail />} />
        <Route path="/heroes/:server/:slug" element={<HeroDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
