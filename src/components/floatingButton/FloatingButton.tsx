import React, {FC} from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {styles} from './styled';

interface IButtonProps {
  onPress: () => void;
}

export const FloatingButton: FC<IButtonProps> = ({onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.icon}>+</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
