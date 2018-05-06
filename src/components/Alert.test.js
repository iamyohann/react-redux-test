import React from 'react';
import ReactDOM from 'react-dom';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import Alert from './Alert';
import theme from '../theme';


describe('Alert', () => {
  it('Alert renders with no props specified', () => {
    const tree = renderer
      .create(<Alert theme={theme} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Alert renders with props specified', () => {
    const tree = renderer
      .create(<Alert theme={theme} a={1} b={2} c={3} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
})
