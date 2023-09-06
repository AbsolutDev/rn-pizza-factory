import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import { BottomMenu } from './screens/BottomMenu.js';
import { AppNavigator } from './screens/AppNavigator.js';
//import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './app/store.js'

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={{flex: 1}}>
          <StatusBar backgroundColor="#000" barStyle='light-content' />
          <AppNavigator />
          <BottomMenu />
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
}

  /*
  {
    id: '',
    type: 'pizza|side|drink|desert',
    size: 0-4,
    crust: 0-3,
    base: 0-2,
    toppings: [],
    calories: <num>,
    quantity: <num>,
    total: <num>
  }
  */