import React from 'react';
import styled from 'styled-components';
import { lighten, transitions } from 'polished';

import TextBox from './TextBox';
import Button from './Button';

const SearchBar = (props) => (
  <div className={props.className}>
    <TextBox placeholder="Enter a search term..." className="searchText" /><Button />
  </div>
)

export default styled(SearchBar)`
  & {
    .searchText {
      border: solid 5px ${props => lighten(0.10, props.theme.brand.light)};
      display: block;
      margin: 0 auto;
      padding: 8px;
      line-height: 1.15;
      font-size: 18px;
      border-radius: 3px;
      ${transitions('border 150ms ease-in 0s')}

      &:focus {
        outline-width: 0;
        border: solid 5px ${props => lighten(0.25, props.theme.brand.light)};
      }
    }
  }
`;
