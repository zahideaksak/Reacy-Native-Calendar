import React, {FC} from 'react';
import {View, Text, Image} from 'react-native';
import {styles} from './styled';

export const SplashScreen: FC<any> = ({navigation}) => {
  setTimeout(() => {
    navigation.navigate('CalendarScreen');
  }, 5000);
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Smart Agenda</Text>
      <Image
        source={require('../../assets/images/site-agenda.png')}
        style={styles.image}
      />
      <Text style={styles.text1}>Plan your schedules easily.</Text>
      <Text style={styles.text2}>
        One click away to manage your schedule, say goodbye to your default
        calendar.
      </Text>
    </View>
  );
};
