import React, { useState, useEffect, useCallback } from 'react';
import { getEnergyData } from './services/get-energy-data.service';
import EnergyDisplay from './components/energy-display/energy-display';
import 'normalize.css';
import css from './app.css'

const App = () => {
  const [energyData, setEnergyData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getData = () => getEnergyData()
    .then(res => setEnergyData(res))
    .catch(err => setError(`${err.code}: ${err.message}`))
    .finally(() => setLoading(false));

  useEffect(() => {
    getData();
  }, []);

  const renderEl = error ? <p className={css.error}>{error}</p> : <EnergyDisplay data={energyData} />;
  const loading = <div>Loading...</div>;

  return (
    <section>
      {
        isLoading ? loading : renderEl
      }
    </section>
  )
}

export {
    App
}
