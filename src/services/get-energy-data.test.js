import axios from 'axios';
import { getEnergyData, getSettlementPeriod } from './get-energy-data.service';
import testResponse from '../../example_api_response.json';
import moment from 'moment';

jest.mock("axios");

describe('getEnergyData', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a response', (done) => {
    axios.get.mockReturnValue(Promise.resolve({
      data: testResponse
    }));
    getEnergyData().then((res) => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(typeof res).toBe('object')
      expect(res.from).toBeDefined();
      expect(res.to).toBeDefined();
      expect(res.generationmix).toBeDefined();
      // Test for errors
      expect(res.code).toBeUndefined();
      expect(res.message).toBeUndefined();
      done();
    });
  });

  it('should return an error', (done) => {
    axios.get.mockReturnValue(Promise.resolve({
      data: {
        error: {
          code: '400',
          message: 'some error...'
        }
      }
    }));

    getEnergyData().catch((error) => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(error.code).toBe('400');
      expect(error.message).toBe('some error...');
      done();
    });
  })
});

describe('getSettlementPeriod', () => {
  it.only('should return the expected value', () => {
    const from1 = moment().startOf('day').add(30, 'minutes');
    const from2 = moment().startOf('day').add(23, 'hours').add(30, 'minutes');

    const expectedValue1 = 2;
    const expectedValue2 = 48;

    const result1 = getSettlementPeriod(from1);
    const result2 = getSettlementPeriod(from2);

    expect(result1).toEqual(expectedValue1);
    expect(result2).toEqual(expectedValue2);
  })
});