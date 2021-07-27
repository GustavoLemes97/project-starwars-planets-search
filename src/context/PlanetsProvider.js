import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import { getPlanetsData } from '../services/starWaresAPI';

function PlanetsProvider({ children }) {
  const [planetsData, setPlanetsData] = useState([]);
  const [loading, setSetLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const handleAPISuccess = ({ results }) => {
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

  return (
    <main>
      <PlanetsContext.Provider
        value={ {
          planetsData,
          fetchPlanetsApi,
          loading,
          error,
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
