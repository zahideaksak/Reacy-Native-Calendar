import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#deebfc',
    paddingHorizontal: 10,
  },
  textTitle: {
    fontSize: 45,
    fontWeight: '900',
    textAlign: 'center',
    fontFamily: 'Alkatra-Bold',
  },
  image: {
    paddingTop: 40,
    width: 392,
    height: 300,
  },
  text1: {
    fontSize: 16,
    color: '#222',
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Lora-Regular',
    paddingTop: 20,
  },
  text2: {
    fontSize: 16,
    color: '#222',
    paddingVertical: 10,
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Lora-Regular',
    paddingHorizontal: 10,
  },
});
