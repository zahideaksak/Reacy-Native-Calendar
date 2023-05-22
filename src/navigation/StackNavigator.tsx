import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CalendarScreen} from '../pages/calendarScreen/CalendarScreen';
import {SplashScreen} from '../pages/splashScreen/SplashScreen';
import {AddTaskModal} from '../modal/addTaskModal';
import {Provider} from 'react-redux';
import store from '../redux/store';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
          <Stack.Screen name="AddTaskModal" component={AddTaskModal} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default StackNavigator;
