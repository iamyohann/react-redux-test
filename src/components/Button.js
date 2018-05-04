import React from 'react';
import styled from 'styled-components';

const Button = ({ children, ...otherProps }) => (
  <button {...otherProps}>{children}</button>
);

export default styled(Button)`
  color: red;
  display: inline-block;
  border: solid 10px red;
  margin: 0 auto;
`;
