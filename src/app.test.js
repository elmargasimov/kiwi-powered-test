import React from "react";
import {create, act} from 'react-test-renderer';
import { App } from "./app";
import testResponse from '../example_api_response.json';
import { getEnergyData } from './services/get-energy-data.service'

jest.mock("./services/get-energy-data.service");

describe("<App />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it('should display a loader', () => {
    getEnergyData.mockReturnValue(
      Promise.resolve({})
    );
    const component = create(<App />);
    const { root } = component;
    const { instance } = root;
    const el = root.findByType('div');
    const response = 'Loading...';
    expect(el.props.children).toBe(response);
    component.unmount();
  })

  it('should fetch the data', async () => {
    let component;

    getEnergyData.mockReturnValue(
      Promise.resolve(testResponse.data)
    );

    await act(async () => {
      component = create(<App />)
    });

    const { root } = component;
    const el = root.findByProps({
      data: testResponse.data
    })

    expect(el.props.data).toBe(testResponse.data);
    component.unmount();
  })


  it('should display an error', async () => {
    let component;

    getEnergyData.mockReturnValue(
      Promise.reject({
        code: '400',
        message: 'Some error...'
      })
    );

    await act(async () => {
      component = create(<App />)
    });

    const { root } = component;
    const el = root.findByType('p');
    const response = '400: Some error...';
    expect(el.props.children).toBe(response)
    component.unmount();
  });
})
