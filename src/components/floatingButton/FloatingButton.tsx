import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {icons} from '../../assets/icons';
import Icon from '../icon';
import {styles} from './styled';

interface IButtonProps {
  onPress: () => void;
}

export const FloatingButton: FC<IButtonProps> = ({onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.addBtnMain}>
      <Icon name="add" path={icons.add} size={35} />
    </TouchableOpacity>
  );
};
