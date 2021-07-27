import React, { useContext } from 'react';
// import './App.css';
import PlanetsContext from '../context/PlanetsContext';

function Filters() {
  const {
    filterByName,
  } = useContext(PlanetsContext);

  return (
    <input
      data-testid="name-filter"
      type="text"
      placeholder="Filtre um Nome"
      onChange={ ({ target: { value } }) => {
        filterByName(value);
      } }
    />
  );
}

export default Filters;
