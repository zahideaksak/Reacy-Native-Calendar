import React, {FC} from 'react';
// import handleAddTask from '../handleAddTask';
// import handleUpdateTask from '../handleUpdateTask';
import Timeline from '../timeLine';

interface Props {
  item: {
    data: any[];
  };
  index: number;
  // handleAddTask: (hr: any, index: any) => void;
  // handleUpdateTask: (task: any, taskIndex: number, index: number) => void;
}

const TimelineContent: FC<Props> = ({item: {data}, index}) => {
  return (
    <Timeline
      data={data}
      // addTask={() => handleAddTask}
      // updateTask={() => handleUpdateTask}
    />
  );
};

export default TimelineContent;
