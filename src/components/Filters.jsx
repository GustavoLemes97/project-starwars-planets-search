import React, { useState, useContext, useEffect } from 'react';
// import './App.css';
import PlanetsContext from '../context/PlanetsContext';

function Filters() {
  const {
    filterByName,
    filterByNumericValues,
    updatePlanets,
    removeFilter,
  } = useContext(PlanetsContext);

  const [state, setState] = useState({
    column: 'population',
    comparison: 'maior que',
    valor: '',
    columnsData: [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ],
    filteredColumns: [],
  });

  const handleChange = ({ name, value }) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const removeColumn = (column) => {
    const { columnsData, filteredColumns } = state;
    const updateColumns = columnsData;
    const updateFiltered = filteredColumns;
    updateColumns.forEach((columnName, index) => {
      if (columnName === column) {
        updateColumns.splice(index, 1);
      }
    });
    updateFiltered.push(column);

    setState({
      ...state,
      columnsData: updateColumns,
      filteredColumns: updateFiltered,
    });
  };

  const removeFilteredColumn = (column) => {
    const { columnsData, filteredColumns } = state;
    const updateColumns = columnsData;
    const updateFiltered = filteredColumns;

    updateFiltered.forEach((columnName, index) => {
      if (columnName === column) {
        updateFiltered.splice(index, 1);
      }
    });
    updateColumns.push(column);

    setState({
      ...state,
      columnsData: updateColumns,
      filteredColumns: updateFiltered,
    });
  };

  useEffect(() => {
    updatePlanets();
  }, [state.filteredColumns]);

  const { column, comparison, valor, columnsData, filteredColumns } = state;

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
      {
        filteredColumns.map((columnName, index) => (
          <div
            key={ index }
            data-testid="filter"
          >
            <span>{ columnName }</span>
            <button
              onClick={ () => {
                removeFilteredColumn(columnName);
                removeFilter(columnName);
              } }
              type="button"
            >
              X
            </button>
          </div>
        ))
      }
    </div>
  );
}

export default Filters;
