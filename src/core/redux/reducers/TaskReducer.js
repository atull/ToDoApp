import {
  UPDATE_TASKLIST,
} from '../type';

const INITIAL_STATE = {
  taskList: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_TASKLIST:
      return { ...state, taskList: action.payload };
    default:
      return { ...state };
  }
}
