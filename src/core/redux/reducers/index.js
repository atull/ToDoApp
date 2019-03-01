import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import TaskReducer from './TaskReducer';

const getTaskReducerConfig = () => ({
  key: 'persistTask',
  storage,
});

export default combineReducers({
  task: persistReducer(getTaskReducerConfig(), TaskReducer),
});
