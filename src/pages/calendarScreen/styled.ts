import {StyleSheet, Dimensions} from 'react-native';
import theme from '../../assets/theme';
const {width, height} = Dimensions.get('window');

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
    zIndex: 2,
  },
  addBtnMain2: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 90,
    right: 25,
    height: 60,
    width: 60,
    zIndex: 3,
  },
  scrollViewMain: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 10,
  },
  timeListMain: {
    width: 55,
  },
  scrollViewFlatList: {
    flex: 1,
  },
  //Using direct values such that they are faster
  main: {
    height,
    width,
    backgroundColor: '#ffffff',
  },
  headerMain: {
    width,
    backgroundColor: theme.bgColor,
    padding: 5,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  headerTopRowHeader: {
    flexDirection: 'row',
    height: 50,
    width: 120,
  },
  headerIconCover: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIconCoverImg: {
    width: 32,
    height: 32,
  },
  headerMonthPicker: {
    flexDirection: 'row',
    height: 50,
    flex: 1,
    alignItems: 'center',
  },
  headerMonthPickerTxt: {
    fontSize: 20,
    fontWeight: '500',
    marginHorizontal: 5,
    color: theme.fgColor,
    fontFamily: 'Lora-Bold',
  },
  contentContainerStyle: {
    paddingLeft: 50,
    marginTop: 10,
    backgroundColor: theme.bgColor,
  },
  addBtnView: {
    position: 'relative',
  },
  addImg: {
    width: 35,
    height: 35,
  },
  dateTimePickerView: {
    opacity: 0,
    position: 'absolute',
  },
  dateTimePicker: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
});
