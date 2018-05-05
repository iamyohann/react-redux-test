import { createStore, combineReducers, applyMiddleware } from 'redux';
import search from './search';
import repository from './repository';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/root';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [],
}

const sagaMiddleware = createSagaMiddleware();

const enhancer = composeWithDevTools(
  applyMiddleware(
    sagaMiddleware,
  ),
);

const rootReducer = combineReducers({
  search,
  repository,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, {}, enhancer);
let persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { persistor, store };


