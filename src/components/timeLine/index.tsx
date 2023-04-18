import React, {FC} from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import hourList from '../../assets/hourList';
import {styles} from './styled';

interface Props {
  data: {
    name: string;
    startHr: number;
    startMin: number;
    endHr: number;
    endMin: number;
  }[];
  addTask?: (hour: number) => void;
  updateTask?: (task: any, taskIndex: number) => void;
}

const Timeline: FC<Props> = ({data, addTask, updateTask}) => {
  const renderHour = (hour: any, index: number) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => addTask?.(hour)}
        key={hour.toString()}>
        <View style={styles.hour}></View>
      </TouchableWithoutFeedback>
    );
  };

  const plotTask = (task: any, idx: number) => {
    const {height, translateY} = calculateData(task);
    return (
      <Text
        onPress={() => updateTask?.(task, idx)}
        key={task.name}
        style={[styles.task, {height, transform: [{translateY}]}]}>
        {task.name}
      </Text>
    );
  };

  return (
    <View style={styles.main}>
      {hourList.map((hour, index) => renderHour(hour, index))}
      {data.map(plotTask)}
    </View>
  );
};

const calculateData = (task: any) => {
  let height = 0;
  const hrDiff = task.endHr - task.startHr;
  if (hrDiff > 0) {
    height = hrDiff * 40;
  } else {
    height = 15;
  }

  let pos = (task.startHr - 1) * 40;
  let topExtra = task.startMin * (40 / 60);
  let translateY = pos + topExtra;

  let bottomExtra = task.endMin * (40 / 60);

  height = height + (bottomExtra - topExtra);
  return {height, translateY};
};

export default Timeline;
