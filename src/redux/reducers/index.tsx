import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: any = [];

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<any>) => {
      console.log('action', action);
      state.push(action.payload);
    },
    updateTask: () => {},
  },
});

export const {addTask, updateTask} = taskSlice.actions;
export default taskSlice.reducer;
