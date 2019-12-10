import React from 'react';
import css from './energy-display.css';
import PropTypes from 'prop-types';
import EnergyBox from '../energy-box/energy-box';
import { getSettlementPeriod } from '../../services/get-energy-data.service';

const EnergyDisplay = ({...props}) => (
  <section>
    <h1 className={css.pageTitle}>GB Electricity National Grid Demand and Output per Production Type</h1>
    <p className={css.lastUpdatedTime}>
      Settlement period: {getSettlementPeriod(props.data.from)}
    </p>
    <ul className={css.energyList}>
      {
        props.data.generationmix
        .sort((a,b) => a.perc < b.perc ? 1 : -1)
        .map(item => (
          <li className={css.energyItem} key={item.fuel}>
            <EnergyBox {...item} />
          </li>
        ))
      }
    </ul>
  </section>
);

EnergyDisplay.propTypes = {
  data: PropTypes.shape({
    generationmix: PropTypes.array,
    from: PropTypes.date
  })
};

EnergyDisplay.defaultProps = {
  data: {
    generationmix: [],
    from: new Date()
  }
};

export default EnergyDisplay;
