import { createStackNavigator } from '@react-navigation/stack';
import { MainScreen } from './MainScreen.js';
import { MakeYourOwnScreen } from './MakeYourOwnScreen.js';
import { ChooseAndCustomizeScreen } from './ChooseAndCustomizeScreen.js';
import { ExtrasScreen } from './ExtrasScreen.js';
import { DessertsScreen } from './DessertsScreen.js';
import { DrinksScreen } from './DrinksScreen.js';
import { CheckOutScreen } from './CheckOutScreen.js';
import { ShoppingCartButton } from '../components/ShoppingCartButton.js';
import { Cart } from './Cart.js';
import { styles } from '../assets/styles.js';

const Stack = createStackNavigator();

export const AppNavigator = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: styles.appHeader,
        headerTintColor: '#eee',
      }}
    >
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={(nav) => ({
          title: 'What Should It Be?',
          headerRight: () => (
            <ShoppingCartButton nav={nav.navigation} />
          )
        })}
      />
      <Stack.Screen
        name="MakeYourOwn"
        component={MakeYourOwnScreen}
        options={(nav) => ({
          headerRight: () => (
            <ShoppingCartButton nav={nav.navigation} />
          )
        })}
      />
      <Stack.Screen
        name="ChooseAndCustomize"
        component={ChooseAndCustomizeScreen}
        options={(nav) => ({
          title: 'Choose a Classic Pizza',
          headerRight: () => (
            <ShoppingCartButton nav={nav.navigation} />
          )
        })}
      />
      <Stack.Screen
        name="ExtrasScreen"
        component={ExtrasScreen}
        options={(nav) => ({
          headerRight: () => (
            <ShoppingCartButton nav={nav.navigation} />
          )
        })}
      />
      <Stack.Screen
        name="ShoppingCart"
        component={Cart}
        options={{
          title: 'Shopping Cart'
        }}
      />
    </Stack.Navigator>
  )
}