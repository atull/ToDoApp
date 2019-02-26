import {
  ADD_TASK,
  COMPLETE_TASK,
  ADD_COMMENT_TASK,
} from '../type';

const INITIAL_STATE = {
  taskList: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_TASK:
      const taskList = [action.payload, ...state.taskList];
      return { ...state, taskList};
    case COMPLETE_TASK:
      const taskObj = action.payload;
      const index = state.taskList.indexOf(taskObj);
      const updatedTaskList = [...state.taskList];
      taskObj.isCompleted = true;
      updatedTaskList.splice(index, 1, taskObj);
      return { ...state, taskList: updatedTaskList };
    case ADD_COMMENT_TASK:
      const taskObj2 = action.payload.taskObj;
      const indx = state.taskList.indexOf(action.payload.taskObj);
      taskObj2.comments.push(action.payload.comment);
      const commentTaskList = [...state.taskList];
      commentTaskList.splice(indx, 1, taskObj2);
      return { ...state, taskList: commentTaskList };
    default:
      return { ...state };
  }
}
