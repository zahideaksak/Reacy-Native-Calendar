import {Dimensions, StyleSheet} from 'react-native';
const deviceSize = Dimensions.get('window');

export const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  innerContainer: {
    backgroundColor: 'grey',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: deviceSize.height / 3,
    padding: 10,
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white',
    marginTop: 30,
    color: 'white',
  },
  buttonContainer: {
    backgroundColor: 'green',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    padding: 10,
  },
  buttonPlaceHolder: {
    color: 'black',
    fontSize: 15,
  },
});
