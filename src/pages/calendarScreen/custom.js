import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {View, Text} from 'react-native';

export default function CustomDateInput({value, ...restProps}) {
  return (
    <View style={{position: 'relative'}}>
      <Text>{value}</Text>
      <View style={{opacity: 0, position: 'absolute'}}>
        <DateTimePicker
          value={value}
          textColor="red"
          style={{backgroundColor: 'rgba(0,0,0,0)'}}
          mode="date"
          onChange={handleSelectDate}
        />
      </View>
    </View>
  );
}
