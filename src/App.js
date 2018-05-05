import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'; // Using hashrouter for older browsers
import styled from 'styled-components';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import Nav from './components/Nav';
import HomePage from './pages/Home';
import SearchResultsPage from './pages/SearchResults';
import RepositoryPage from './pages/Repository';
import NotFound from './pages/404';
import { store, persistor } from './redux/index';

const App = ({ className }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <div className={className}>
        <Router>
          <React.Fragment>
            <Nav />
            <div className="pageContent">
              <Switch>
                  <Route exact path='/' component={HomePage} />
                  <Route path='/results' component={SearchResultsPage} />
                  <Route path='/repository' component={RepositoryPage} />

                  {/* 404 route below */}
                  <Route component={NotFound} />

              </Switch>
            </div>
          </React.Fragment>
        </Router>
      </div>
    </PersistGate>
  </Provider>
);

export default styled(App)`
  color: ${props => props.theme.textColor};

  & .pageContent {
    padding: 10px 30px;
  }
`;
