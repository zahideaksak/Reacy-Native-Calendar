import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ITasks} from './ITask';
import {ITask} from '../../../models';

const initialState: ITasks.State = {
  tasks: [
    {
      endTime: '13:00',
      selectedDate: '2023-05-26T12:45:51+03:00',
      startTime: '12:45',
      task: 'Fkflf',
      taskID: 1,
      title: 'Dkdk',
    },
  ],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      console.log('addTask:', action);
      state.tasks = [...state.tasks, action.payload];
      // state.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<{id: number}>) => {
      //console.log('delete: ', current(state), action);
      // const taskWithIdIndex = current(state).findIndex(
      //   (task: ITask) => task.taskID === action.payload.id,
      // );
      // if (taskWithIdIndex > -1) {
      //   state.splice(taskWithIdIndex, 1);
      // }
      // return state;
    },
    updateTask: (state = initialState, action: PayloadAction<any>) => {
      console.log('update', state, action);
      // current(state).map((task: ITask, index: number) => {
      //   console.log('index', index);
      //   if (task.taskID === action.payload.id) {
      //     state.task.startTime = action.payload.startTime;
      //     state.task.endTime = action.payload.endTime;
      //     state.task.title = action.payload.title;
      //     state.task.task = action.payload.task;
      //   }
      // });
      return {
        // Again copy the entire state object
        ...state,
        // This time, we need to make a copy of the old todos array
        tasks: state.tasks.map(task => {
          //If this isn't the todo item we're looking for, leave it alone
          if (task.taskID === action.payload.taskID) {
            return action.payload;
          } else {
            return task;
          }
          //console.log('kontrol', task.taskID, action.payload);
        }),
      };
    },
  },
});

export const {addTask, deleteTask, updateTask} = taskSlice.actions;
export default taskSlice.reducer;
