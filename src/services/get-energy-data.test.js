import axios from 'axios';
import { getEnergyData } from './get-energy-data.service';
import testResponse from '../../example_api_response.json';

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
})
