import React, {FC} from 'react';
import {View, Text} from 'react-native';
import {styles} from './styled';

const RenderHour: FC<any> = (item: any, index: any) => {
  return (
    <View style={styles.timeListItem} key={index}>
      <Text style={styles.timeListTxt}>{item.txt}</Text>
    </View>
  );
};

export default RenderHour;
