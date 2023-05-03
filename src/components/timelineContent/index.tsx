import React, {FC} from 'react';
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
      // addTask={hr => handleAddTask(hr, index)}
      // updateTask={(task, taskIndex) => handleUpdateTask(task, taskIndex, index)}
    />
  );
};

export default TimelineContent;
