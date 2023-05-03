import moment from 'moment';
import React, {FC} from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import hourList from '../../assets/hourList';
import {styles} from './styled';

interface Props {
  data: any;
  addTask: (hour: any) => void;
  updateTask: (task: any, idx: any) => void;
}

const Timeline: FC<Props> = ({data, addTask, updateTask}) => {
  const renderHour = (hour: any, index: any) => {
    return (
      <>
        <TouchableWithoutFeedback onPress={() => addTask(hour)} key={hour.txt}>
          <View style={styles.hour} />
        </TouchableWithoutFeedback>
      </>
    );
  };
  const plotTask = (task: any, idx: any) => {
    const {height, translateY} = calculateData(task);
    console.log('task', task);
    return (
      <Text
        onPress={() => updateTask(task, idx)}
        key={task.name}
        style={[
          styles.task,
          {
            height,
            transform: [
              {
                translateY,
              },
            ],
          },
        ]}>
        {task.title}
      </Text>
    );
  };

  return (
    <View style={styles.main}>
      {hourList.map((hour, index) => renderHour(hour, index))}
      {data.map((task: any, idx: any) => plotTask(task, idx))}
      {/* ??? */}
    </View>
  );
};

const calculateData = (task: any) => {
  let height = 0;
  let translateY = 0;

  const hrDiff = task.endTime.split(':')[0] - task.startTime.split(':')[0];
  if (hrDiff > 0) {
    height = hrDiff * 40;
  } else {
    height = 15;
  }
  let pos = (task.startTime.split(':')[0] - 1) * 40;
  let topExtra = task.startTime.split(':')[1] * (40 / 60);
  translateY = pos + topExtra;

  let bottomExtra = task.endTime.split(':')[1] * (40 / 60);

  height = height + (bottomExtra - topExtra);
  return {height, translateY};
};

export default Timeline;
