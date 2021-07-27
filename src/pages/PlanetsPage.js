import React from 'react';
// import './App.css';
import Table from '../components/Table';
import Filters from '../components/Filters';

function PlanetsPage() {
  return (
    <div>
      <Filters />
      <Table />
    </div>
  );
}

export default PlanetsPage;
