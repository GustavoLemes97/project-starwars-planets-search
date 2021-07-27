import React, { useState, useContext } from 'react';
// import './App.css';
import PlanetsContext from '../context/PlanetsContext';

function Filters() {
  const {
    filterByName,
    filterByNumericValues,
  } = useContext(PlanetsContext);

  const [state, setState] = useState({ column: '', comparison: '', valor: '' });

  const handleChange = ({ name, value }) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const { column, comparison, valor } = state;

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        placeholder="Filtre um Nome"
        onChange={ ({ target: { value } }) => {
          filterByName(value);
        } }
      />
      <select
        onChange={ ({ target }) => handleChange(target) }
        name="column"
        data-testid="column-filter"
      >
        <option defaultValue="selected">Selecione uma Opção</option>
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        onChange={ ({ target }) => handleChange(target) }
        name="comparison"
        data-testid="comparison-filter"
      >
        <option defaultValue="selected">Selecione uma Opção</option>
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        onChange={ ({ target }) => handleChange(target) }
        name="valor"
        data-testid="value-filter"
        type="number"
        placeholder="Valor"
      />
      <button
        onClick={ () => {
          filterByNumericValues(column, comparison, valor);
        } }
        data-testid="button-filter"
        type="button"
      >
        Filtrar
      </button>
    </div>
  );
}

export default Filters;
