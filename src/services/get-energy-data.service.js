import axios from 'axios';
import moment from 'moment';

const getEnergyData = (url = 'https://api.carbonintensity.org.uk/generation') => (
  // Return a new promise because of the APIs error response status
  new Promise((resolve, reject) => {
    axios.get(url)
      .then((response) => {
        const {
          data
        } = response;

        if (data.error) {
          reject(data.error)
        }

        if (data.data) {
          resolve(data.data)
        }
      });
    })
);


const getSettlementPeriod = (from) => {
  const start = moment().startOf('day');
  const diff = moment(from).diff(start, 'minutes');
  return (diff / 30) + 1;
};

export {
  getEnergyData,
  getSettlementPeriod
};
