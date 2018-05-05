import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { parse } from 'query-string';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { darken } from 'polished';

import { search } from '../redux/search';
import { ErrorAlert } from '../components/Alert';
import DataTable from '../components/DataTable';

const mapStateToProps = (state, ownProps) => {
  return {
    search: state.search,
  }
}

const mapDispatchToProps = {
  doSearch: search,
}

class SearchResults extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { search: searchQuery = null } = this.props.location;
    this.props.doSearch(search ? parse(searchQuery).query : null);
  }

  render() {
    // const { error } = this.state;
    const { search } = this.props;
    let searchResultContent = null;

    if (search.results !== null) {
      const { search: searchQuery = null } = this.props.location;
      searchResultContent = (
        <React.Fragment>
          <h4 className="title">Showing {search.results.items.length} of {search.results.total_count} results for '{parse(searchQuery).query}'</h4>
          <DataTable className="results">
            <thead>
              <tr>
                  <th>Foo</th>
                  <th>Bar</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>2</td>
              </tr>
            </tbody>
          </DataTable>
        </React.Fragment>
      );
    }

    return (
      <div className={this.props.className}>
        {searchResultContent}
        {search.error && <ErrorAlert>{search.error}</ErrorAlert>}
      </div>
    );
  }
}

const StyledSearchResults = styled(SearchResults)`
  & {
    .title {
      color: ${props => darken(0.1, props.theme.textColor)}
    }
    .results {
    }
  }
`

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StyledSearchResults));
