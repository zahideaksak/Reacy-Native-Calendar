import React, {FC} from 'react';
import Timeline from '../timeLine';

interface Props {
  item: {
    data: any[];
  };
  index: number;
  handleUpdateTask: (task: any, taskIndex: number, index: number) => void;
}

const TimelineContent: FC<Props> = ({
  item: {data},
  index,
  handleUpdateTask,
}) => {
  return (
    <Timeline
      data={data}
      updateTask={(task, taskIndex) => handleUpdateTask(task, taskIndex, index)}
    />
  );
};

export default TimelineContent;
