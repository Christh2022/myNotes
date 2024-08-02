import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import Dashboard from './App/screens/Dashboard';
import NoteScreen from './App/screens/NoteScreen';
import FormScreen from './App/screens/FormScreen.js';

enableScreens();


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer  >
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen options={{ headerShown: false }} name="Dashboard" component={Dashboard} />
        <Stack.Screen  name="Note" component={NoteScreen} />
        <Stack.Screen options={{
          title: 'Create Form',
          headerTitleStyle: {
            width: 117,
            height: 27,
            fontSize: 20,
            fontWeight: '700',
            color: '#3D3B3B',
            textAlign: 'center',
          },
          headerStyle: {
            borderBottomColor: 'white'
          },
         }}  name="Form" component={FormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}