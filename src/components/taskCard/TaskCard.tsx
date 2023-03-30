import React, {FC} from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {styles} from './styled';
interface ICardProps {
  isCompleted: boolean;
  item: any;
  onDelete: () => void;
}

export const TaskCard: FC<ICardProps> = ({isCompleted, item, onDelete}) => {
  return isCompleted ? (
    <TouchableWithoutFeedback onLongPress={onDelete}>
      <View style={styles.completedContainer}>
        <Text style={styles.completedTaskText}>{item.task}</Text>
      </View>
    </TouchableWithoutFeedback>
  ) : (
    <TouchableWithoutFeedback onLongPress={onDelete}>
      <View style={styles.container}>
        <Text style={styles.taskText}>{item.task}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
