import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Fallback for undeveloped routes */}
        <Route path="*" element={<div className="p-8 text-gray-500">Coming Soon...</div>} />
      </Routes>
    </HashRouter>
  );
};

export default App;
