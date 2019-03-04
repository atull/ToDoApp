// @flow

import {
  UPDATE_TASKLIST,
} from '../type';

const { CustomJSTypes } = require('src/core/utils');

export const addNewTask = (taskObj: CustomJSTypes.TaskObjType) => (dispatch: Function, getState: Function) => {
  const { task } = getState();
  const taskList = [taskObj, ...task.taskList];
  dispatch({ type: UPDATE_TASKLIST, payload: taskList });
};

export const completeTask = (taskObj: CustomJSTypes.TaskObjType) => (dispatch: Function, getState: Function) => {
  const { task } = getState();
  const index = task.taskList.indexOf(taskObj);
  const taskList = [...task.taskList];
  taskObj.isCompleted = true;
  taskList.splice(index, 1, taskObj);
  dispatch({ type: UPDATE_TASKLIST, payload: taskList });
};

export const addCommentToTask = (taskObj: CustomJSTypes.TaskObjType, comment: string) => (dispatch: Function, getState: Function) => {
  const { task } = getState();
  const indx = task.taskList.indexOf(taskObj);
  taskObj.comments.push(comment);
  const taskList = [...task.taskList];
  taskList.splice(indx, 1, taskObj);
  dispatch({ type: UPDATE_TASKLIST, payload: taskList });
};
