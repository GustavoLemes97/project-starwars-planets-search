import React from 'react';
import './App.css';
import PlanetsPage from './pages/PlanetsPage';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <PlanetsPage />
    </PlanetsProvider>
  );
}

export default App;
