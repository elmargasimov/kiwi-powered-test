import React from "react";
import {create, act} from 'react-test-renderer';
import testResponse from '../../../example_api_response.json';
import EnergyDisplay from "./energy-display";

describe("<EnergyDistGrid />", () => {
  let component;

  beforeEach(() => {
    component = create(<EnergyDisplay data={testResponse.data} />)
  })

  afterEach(() => {
    component.unmount();
  })

  it('displays all the energy boxes', () => {
    const { root } = component;
    const el = root.findByType('ul');
    const children = el.props.children;
    expect(children.length).toBe(testResponse.data.generationmix.length);
  })

  it('correctly displays the generationmix in descending order', () => {
    const { root } = component;
    const el = root.findByType('ul');
    const biggest = 'gas';
    const smallest = 'other';
    const children = el.props.children;
    const last = children.length - 1;
    expect(children[0].key).toBe(biggest);
    expect(children[last].key).toBe(smallest);
  })

  it('displays a page header', () => {
    const { root } = component;
    const el = root.findByType('h1');
    const response = 'GB Electricity National Grid Demand and Output per Production Type';
    expect(el.props.children).toBe(response);
  })

  it('displays a date', () => {
    const { root } = component;
    const el = root.findByType('p');
    const date = 'Mon, 12 Aug 2019 12:30:00 GMT';
    expect(el.props.children[0]).toContain('Last updated on');
    expect(el.props.children[1]).toContain(date);
  })
});
