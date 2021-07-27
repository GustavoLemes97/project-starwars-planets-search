import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import { getPlanetsData } from '../services/starWaresAPI';

function PlanetsProvider({ children }) {
  const [apiData, setAPIData] = useState([]);
  const [planetsData, setPlanetsData] = useState([]);
  const [loading, setSetLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [filters, setFilters] = useState([]);

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
      name.includes(text)
    ));
    setPlanetsData(filterPlanets);
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
