import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  textTitle: {
    fontSize: 35,
    fontWeight: '900',
    textAlign: 'center',
    fontFamily: 'Alkatra-Bold',
  },
  image: {
    width: 350,
    height: 350,
  },
  text1: {
    fontSize: 13,
    color: '#222',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Lora-Regular',
  },
  text2: {
    fontSize: 13,
    color: '#222',
    paddingVertical: 20,
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Lora-Regular',
  },
});
