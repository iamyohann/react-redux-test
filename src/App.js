import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'; // Using hashrouter for older browsers
import styled from 'styled-components';
import cls from 'classnames';

import Nav from './components/Nav';
import HomePage from './pages/Home';
import SearchResultsPage from './pages/SearchResults';
import NotFound from './pages/404';

const App = ({ className }) => (
  <div className={cls('App', className)}>
    <Router>
      <Switch>
        <Nav />
        <Route exact path='/' component={HomePage} />
        <Route path='/results' component={SearchResultsPage} />

        {/* 404 route below */}
        <Route component={NotFound} />
      </Switch>
    </Router>
  </div>
);

export default styled(App)`
  color: ${props => props.theme.textColor}

`;
