
import { all } from 'redux-saga/effects';
import { searchFlow } from './search';

export default function* rootSaga() {
  yield all([
    searchFlow(),
  ])
}

