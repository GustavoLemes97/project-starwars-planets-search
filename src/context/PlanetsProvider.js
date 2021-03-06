import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import { getPlanetsData } from '../services/starWaresAPI';

function PlanetsProvider({ children }) {
  const [apiData, setAPIData] = useState([]);
  const [planetsData, setPlanetsData] = useState([]);
  const [loading, setSetLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [filters, setFilters] = useState([
    { filterByName: {} },
    { filterByNumericValues: [] },
  ]);

  const handleAPISuccess = ({ results }) => {
    setAPIData(results);
    setPlanetsData(results);
    setSetLoading(false);
  };

  const handleAPIError = ({ message }) => {
    setError(message);
    setSetLoading(false);
  };

  const fetchPlanetsApi = async () => {
    setSetLoading(true);

    try {
      const response = await getPlanetsData();
      handleAPISuccess(response);
    } catch (errorMessage) {
      handleAPIError(errorMessage);
    }
  };

  const filterByName = (text) => {
    const updatedFilter = filters;
    updatedFilter[0] = { filterByName: { text } };
    setFilters(updatedFilter);

    const filterPlanets = apiData.filter(({ name }) => (
      name.toLowerCase().includes(text.toLowerCase())
    ));
    setPlanetsData(filterPlanets);
  };

  const updatePlanets = () => {
    const { filterByNumericValues } = filters[1];
    let filterPlanets = apiData;

    filterByNumericValues.forEach(({ column, comparison, value }) => {
      filterPlanets = filterPlanets.filter((planet) => {
        if (comparison === 'maior que') {
          return parseInt(planet[`${column}`], 10) > parseInt(value, 10);
        }
        if (comparison === 'menor que') {
          return parseInt(planet[`${column}`], 10) < parseInt(value, 10);
        }
        if (comparison === 'igual a') {
          return parseInt(planet[`${column}`], 10) === parseInt(value, 10);
        }
        return null;
      });
    });
    setPlanetsData(filterPlanets);
  };

  const filterByNumericValues = (column, comparison, value) => {
    const updatedFilter = filters;
    updatedFilter[1].filterByNumericValues.push({
      column,
      comparison,
      value,
    });
    setFilters(updatedFilter);

    updatePlanets();
  };

  const removeFilter = (columnName) => {
    let updateFilter = [];
    const auxFilter = filters.slice();
    updateFilter = filters[1].filterByNumericValues.filter(({ column }) => (
      columnName !== column
    ));
    auxFilter[1].filterByNumericValues = updateFilter;
    setFilters(auxFilter);
    updatePlanets();
  };

  return (
    <main>
      <PlanetsContext.Provider
        value={ {
          planetsData,
          fetchPlanetsApi,
          loading,
          error,
          filterByName,
          filterByNumericValues,
          updatePlanets,
          removeFilter,
        } }
      >
        {children}
      </PlanetsContext.Provider>
    </main>
  );
}

export default PlanetsProvider;

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
