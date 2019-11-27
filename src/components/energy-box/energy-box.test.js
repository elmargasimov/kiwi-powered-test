import React from "react";
import {create, act} from 'react-test-renderer';
import testResponse from '../../../example_api_response.json';
import EnergyBox from "./energy-box";

describe("<EnergyBox />", () => {
  let component;

  const data = testResponse.data.generationmix[0];

  beforeEach(() => {
    component = create(<EnergyBox data={data} />)
  })

  afterEach(() => {
    component.unmount();
  })

  // I generally don't like snapshots as it lacks context.
  // E.g. In a large project with multiple developers it causes the tests to break too often
  // without anyone really knowing why.
  // But since this is a small component that won't change much, it's useful.

  it('matches the snapshot', () => {
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('displays the energy type', () => {
    const { root } = component;
    expect(root.props.data.fuel).toBe(data.fuel);
  })

  it('displays the energy type', () => {
    const { root } = component;
    expect(root.props.data.perc).toBe(data.perc);
  })
});
