import {StyleSheet} from 'react-native';
import theme from '../../assets/theme';

export const styles = StyleSheet.create({
  timeHeaderMain: {
    width: 60,
    height: 60,
    alignItems: 'center',
    backgroundColor: theme.bgColor,
  },
  timeHeaderWeekDay: {
    fontSize: 13,
    color: theme.grey,
  },
  timeHeaderDay: {
    fontSize: 20,
    color: theme.fgColor,
  },
});
