import React, {FC} from 'react';
import {View, Text} from 'react-native';
import {styles} from './styled';

interface Props {
  item: {
    weekDay: string;
    day: string;
    events: any[];
  };
}

const TimelineHeader: FC<Props> = ({item: {weekDay, day}}) => {
  return (
    <View style={styles.timeHeaderMain}>
      <Text style={styles.timeHeaderWeekDay}>{weekDay}</Text>
      <Text style={styles.timeHeaderDay}>{day}</Text>
    </View>
  );
};

export default TimelineHeader;
