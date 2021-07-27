import React, { useState, useContext } from 'react';
// import './App.css';
import PlanetsContext from '../context/PlanetsContext';

function Filters() {
  const {
    filterByName,
    filterByNumericValues,
  } = useContext(PlanetsContext);

  const [state, setState] = useState({
    column: '',
    comparison: '',
    valor: '',
    columnsData: [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ],
  });

  const handleChange = ({ name, value }) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const removeColumn = (column) => {
    const { columnsData } = state;
    const updateColumns = columnsData;
    updateColumns.forEach((columnName, index) => {
      if (columnName === column) {
        updateColumns.splice(index, 1);
      }
    });

    setState({
      ...state,
      columnsData: updateColumns,
    });
  };

  const { column, comparison, valor, columnsData } = state;

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
        {/* <option defaultValue="selected">Selecione uma Opção</option> */}
        { columnsData.map((columnName, index) => (
          <option
            key={ index }
            value={ columnName }
          >
            {columnName}
          </option>
        ))}
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
          removeColumn(column);
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
