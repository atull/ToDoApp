import {
  ADD_TASK,
} from '../type';

const INITIAL_STATE = {
  taskList: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TASK:
      const taskList = [action.payload, ...state.taskList];
      return { ...state, taskList};
    default:
      return { ...state };
  }
}
