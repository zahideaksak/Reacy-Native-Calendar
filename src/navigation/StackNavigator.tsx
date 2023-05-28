import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CalendarScreen} from '../pages/calendarScreen/CalendarScreen';
import {SplashScreen} from '../pages/splashScreen/SplashScreen';
import {Provider} from 'react-redux';
import store from '../redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';

const Stack = createNativeStackNavigator();
let persistor = persistStore(store);

const StackNavigator = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default StackNavigator;
