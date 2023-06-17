import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Home, Instructions} from 'screens';
import {SnackbarPage} from 'screens/demo-snackbar/pages/SnackbarPage';
import {SnackbarPage2} from 'screens/demo-snackbar/pages/SnackbarPage2';

const nav = createStackNavigator();
export const RootStackNav: React.FC = () => {
  return (
    <nav.Navigator initialRouteName={Home.name}>
      <nav.Screen name="Home" component={Home} options={{headerShown: false}} />
      <nav.Screen name="Instructions" component={Instructions} />
      <nav.Screen name="SnackbarPage" component={SnackbarPage} />
      <nav.Screen name="SnackbarPage2" component={SnackbarPage2} />
    </nav.Navigator>
  );
};
