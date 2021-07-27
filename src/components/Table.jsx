import React, { useEffect, useContext } from 'react';
// import './App.css';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const {
    planetsData,
    loading,
    fetchPlanetsApi,
    error,
  } = useContext(PlanetsContext);

  useEffect(() => {
    fetchPlanetsApi();
  }, []);

  const renderTable = () => {
    const table = (
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Período de Rotação</th>
            <th>Período de Órbita</th>
            <th>Diâmetro</th>
            <th>Clima</th>
            <th>Gravidade</th>
            <th>Terreno</th>
            <th>Água na Superfície</th>
            <th>População</th>
            <th>Filmes</th>
            <th>Criado</th>
            <th>Editado</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          { planetsData.map((planet) => (
            <tr key={ planet.name }>
              <td>{ planet.name }</td>
              <td>{ planet.rotation_period }</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate }</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.population }</td>
              <td>{ planet.films }</td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.url }</td>
            </tr>
          )) }
        </tbody>
      </table>
    );
    if (error === undefined) return table;
    return (
      <div>
        Erro:
        { error }
      </div>
    );
  };

  const renderLoading = () => <div>Loading...</div>;

  return (
    <div>
      {loading ? renderLoading() : renderTable()}
    </div>
  );
}

export default Table;
