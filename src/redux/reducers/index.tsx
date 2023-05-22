import {createSlice} from '@reduxjs/toolkit';

const initialState: any = {
  tasks: [],
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTasks: (state, action: any) => {
      state.value.push(action.payload);
    },
    updateTasks: () => {},
  },
});

export const {addTasks, updateTasks} = taskSlice.actions; //CreateAction()
export default taskSlice.reducer; //createReducer()
