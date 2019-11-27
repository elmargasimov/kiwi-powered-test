import React from 'react';
import css from './energy-box.css';
import PropTypes from 'prop-types';

const EnergyBox = ({...props}) => (
  <div className={css.energyBox}>
    <div>
      <strong className={css.energyBoxTitle}>{props.fuel}</strong>
      <span className={css.energyBoxPerc}>{props.perc}%</span>
    </div>
  </div>
);

export default EnergyBox;

EnergyBox.propTypes = {
  fuel: PropTypes.string,
  perc: PropTypes.number
};

EnergyBox.defaultProps = {
  fuel: '',
  perc: 0
};
