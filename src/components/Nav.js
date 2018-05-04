import React from 'react';
import cls from 'classnames';
import styled from 'styled-components';
import { darken, lighten, transparentize } from 'polished';
import { Link } from 'react-router-dom';

const Nav = (props) => (
  <div className={cls('header', props.className)}>
    <Link className={cls('logo', 'font-serif')} to='/'>GitSearch</Link>
    <div className="nav-right">
      <a>Trending</a>
      <a>Trending2</a>
      <a>Trending3</a>
    </div>
  </div>
);

export default styled(Nav)`
  overflow: hidden;
  padding: 15px 10px;

  .logo {
    color: ${props => props.theme.textColor};
    text-decoration: none;
    font-size: 24px;
  }

  .nav-right {
    float: right;

    & a {
      padding: 0px 10px;
      color: ${props => transparentize(0.2, props.theme.textColor)}
    }
  }
`;
