import {StyleSheet} from 'react-native';
import theme from '../../assets/theme';

export const styles = StyleSheet.create({
  hour: {
    width: 60,
    height: 40,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.faint,
  },
  task: {
    borderRadius: 5,
    position: 'absolute',
    width: 60,
    zIndex: 20,
    backgroundColor: theme.primary,
    overflow: 'hidden',
  },
  taskText: {
    fontSize: 11,
    color: theme.bgColor,
    paddingTop: 6,
    textAlign: 'center',
  },
  main: {
    width: 60,
    backgroundColor: theme.bgColor,
  },
});
