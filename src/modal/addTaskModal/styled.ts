import {Dimensions, StyleSheet} from 'react-native';
const deviceSize = Dimensions.get('window');

export const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  innerContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: deviceSize.height / 2,
    padding: 10,
  },
  title: {
    color: 'black',
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  timeBtn: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
    borderColor: '#f2f2f2',
    marginBottom: 10,
  },
  btnText: {
    fontSize: 15,
    fontWeight: '400',
    color: '#3c4248',
  },
  inputName: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#f2f2f2',
    color: 'black',
    height: 50,
    paddingLeft: 5,
  },
  inputTask: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#f2f2f2',
    marginTop: 10,
    color: 'black',
    height: 50,
    paddingLeft: 5,
  },
  buttonContainer: {
    backgroundColor: '#99badd',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    padding: 12,
    height: 50,
  },
  buttonPlaceHolder: {
    color: 'black',
    fontSize: 15,
    fontWeight: '400',
  },
});
