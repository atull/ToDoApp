// @flow

import {
  ADD_TASK,
} from '../type';

export const addTask = (taskObj) => ({
  type: ADD_TASK,
  payload: taskObj,
});
