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
    fontSize: 11,
    color: theme.bgColor,
    textAlign: 'center',
    borderRadius: 5,
    position: 'absolute',
    width: 60,
    zIndex: 20,
    backgroundColor: theme.primary,
    overflow: 'hidden',
    paddingTop: 5,
  },
  main: {
    width: 60,
    backgroundColor: theme.bgColor,
  },
});
