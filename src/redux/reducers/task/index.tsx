import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ITasks} from './ITask';
import {ITask} from '../../../models';

const initialState: ITasks.State = {
  tasks: [],
};
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      console.log('addTask:', action);
      state.tasks = [...state.tasks, action.payload];
    },
    deleteTask: (state, action: PayloadAction<{id: number}>) => {
      const taskWithIdIndex = state.tasks.findIndex(
        (task: ITask) => task.taskID === action.payload.id,
      );
      if (taskWithIdIndex > -1) {
        state.tasks.splice(taskWithIdIndex, 1);
      }
      return state;
    },
    updateTask: (state = initialState, action: PayloadAction<any>) => {
      console.log('update', state, action);
      return {
        ...state,
        tasks: state.tasks.map(task => {
          if (task.taskID === action.payload.taskID) {
            return action.payload;
          } else {
            return task;
          }
        }),
      };
    },
  },
});
export const {addTask, deleteTask, updateTask} = taskSlice.actions;
export default taskSlice.reducer;
