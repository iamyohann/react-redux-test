import { takeEvery, put, call } from 'redux-saga/effects';
import { search, searchSuccess, searchFailure } from '../redux/search';
import axios from 'axios';

import config from '../config';

const searchRequest = function* _searchRequest({ payload }) {
  const { term = null } = payload;

  if (term) {
    try {
      // do axios call
      const results = yield call(axios.get, `${config.api.host}/search/users`, {
        params: {
          q: term,
        }
      });

      if (results.statusText === "OK") {
        yield put(searchSuccess(results.data))
      }
    } catch (e) {
      if (e.response && e.response.data) {
        yield put(searchFailure(new Error(e.response.data.message)));
      } else {
        yield put(searchFailure(new Error(e.message)));
      }

    }

  } else {
    yield put(searchFailure(new Error("Invalid search term, please try again")))
  }
}

const searchFlow = function* _searchFlow() {
  yield takeEvery(search.toString(), searchRequest);
}

export { searchFlow };
