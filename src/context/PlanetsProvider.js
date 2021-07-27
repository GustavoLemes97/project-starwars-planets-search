import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import { getPlanetsData } from '../services/starWaresAPI';

function PlanetsProvider({ children }) {
  const [planetsData, setPlanetsData] = useState({ isLoading: false, data: [] });

  const handleAPISuccess = (response) => {
    setPlanetsData({
      ...planetsData,
      isLoading: false,
      data: response,
    });
  };

  const handleAPIError = (response) => {
    setPlanetsData({
      ...planetsData,
      isLoading: false,
      erro: response.message,
    });
  };

  const fetchPlanetsApi = async () => {
    setPlanetsData({ isLoading: true });

    try {
      const response = await getPlanetsData();
      handleAPISuccess(response);
    } catch (error) {
      handleAPIError(error);
    }
  };

  return (
    <main>
      <PlanetsContext.Provider value={ { planetsData, fetchPlanetsApi } }>
        {children}
      </PlanetsContext.Provider>
    </main>
  );
}

export default PlanetsProvider;

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
