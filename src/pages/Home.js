import React from 'react';
import styled from 'styled-components';
import { transparentize } from 'polished';

import TextBox from '../components/TextBox';
import SearchBar from '../components/SearchBar';

const Home = (props) => (
  <div className={props.className}>
    <p className="helpText">Find a user, repo or code...</p>
    <SearchBar />
    <p className="footNotes">Eg: example1, example2, example3</p>
  </div>
);

export default styled(Home)`
  & {
    .footNotes, .helpText {
      text-align: center;
    }
    .helpText {
      font-size: 32px;
      font-weight: 300;
      padding: 20px 0;
    }
    .footNotes {
      text-align: center;
      font-size: 11px;
      color: ${props => transparentize(0.3, props.theme.textColor)}
    }
  }
`;
