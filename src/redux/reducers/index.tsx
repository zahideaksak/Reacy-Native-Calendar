import {createSlice, PayloadAction, current} from '@reduxjs/toolkit';
import {ITask} from '../../models';

const initialState: any = [];

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<any>) => {
      console.log('action', action);
      state.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<any>) => {
      console.log('delete: ', current(state), action);
      const taskWithIdIndex = current(state).findIndex(
        (task: ITask) => task.taskID === action.payload.id,
      );
      if (taskWithIdIndex > -1) {
        state.splice(taskWithIdIndex, 1);
      }
      return state;
    },
    updateTask: (state, action: PayloadAction<any>) => {
      console.log('update', current(state), action);
      const newState = current(state);

      newState.map((task: ITask, index: number) => {
        console.log(
          'mapliyorum',
          current(state),
          task.taskID,
          action.payload.taskID,
        );
        if (task.taskID === action.payload.taskID) {
          console.log('if içi', action.payload);
          newState[index] = action.payload;
        }
      });
      console.log('update', newState);
      state = newState;
    },
  },
});

export const {addTask, deleteTask, updateTask} = taskSlice.actions;
export default taskSlice.reducer;
