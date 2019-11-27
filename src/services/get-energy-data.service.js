import axios from 'axios';

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

export {
  getEnergyData
};
