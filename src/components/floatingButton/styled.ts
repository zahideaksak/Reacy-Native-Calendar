import {StyleSheet} from 'react-native';
import theme from '../../assets/theme';

export const styles = StyleSheet.create({
  addBtnMain: {
    backgroundColor: theme.bgColor,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 90,
    right: 25,
    height: 60,
    width: 60,
  },
});
