import React from 'react';
import styled from 'styled-components';

const Button = ({ children, ...otherProps }) => (
  <button {...otherProps}>{children}</button>
);

export default styled(Button)`
  &:focus {
        outline: none;
  }
`;
