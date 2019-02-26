// @flow

import {
  ADD_TASK,
  COMPLETE_TASK,
  ADD_COMMENT_TASK,
} from '../type';

const { CustomJSTypes } = require('src/core/utils');

export const addNewTask = (taskObj: CustomJSTypes.TaskObjType) => ({
  type: ADD_TASK,
  payload: taskObj,
});

export const completeTask = (taskObj: CustomJSTypes.TaskObjType) => ({
  type: COMPLETE_TASK,
  payload: taskObj,
});

export const addCommentToTask = (taskObj: CustomJSTypes.TaskObjType, comment: string) => ({
  type: ADD_COMMENT_TASK,
  payload: {taskObj, comment},
});
