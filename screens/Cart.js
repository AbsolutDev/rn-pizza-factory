import { Text, View, ScrollView, Pressable, Alert, ToastAndroid } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderBackButton } from '@react-navigation/elements';
import { CartPizza } from "../components/CartPizza";
import { CartExtra } from "../components/CartExtra";
import { changeQuantity, clearCart, removeFromCart, selectCartContent, selectCartTotalPrice } from "../features/cart";
import { useEffect } from "react";
import { styles } from "../assets/styles";
import { DATA } from "../assets/data";

export const Cart = (props) => {
  const nav = props.navigation;
  const dispatch = useDispatch();
  const cartContent = useSelector(selectCartContent);
  const cartTotal = useSelector(selectCartTotalPrice);
  
  useEffect(()=>{
    props.navigation.setOptions({
      headerLeft: (props) => (
        <HeaderBackButton {...props} onPress={() => nav.navigate("Main")} />
      )
    })
  }, [])

  const showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  }

  const changeQuantityHandler = (productCode, qty) => {
    if (qty === 0) {
      //Remove product
      Alert.alert('', `Remove from cart?`,[
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'REMOVE',
          onPress: () => {
            dispatch(removeFromCart(productCode));
            (pizzaElements.length + extraElements.length === 1) && props.navigation.goBack();
          }
        }
      ],{
        cancelable: true
      })
    } else {
      dispatch(changeQuantity(productCode, qty))
    }
  }

  const onCompleteOrderPressHandler = () => {
    showToast("Order submitted");
    dispatch(clearCart());
    props.navigation.navigate('Main');
  }

  const pizzaElements = [];
  const extraElements = [];
  for (let item of cartContent) {
    switch (item.productType) {
      case 'custom':
      case 'bespoke':
        pizzaElements.push(<CartPizza data={item} key={pizzaElements.length + extraElements.length} handler={changeQuantityHandler} nav={props.navigation}/>)
        break
      case 'dessert':
      case 'side':
      case 'drink':
        extraElements.push(<CartExtra data={item} key={pizzaElements.length + extraElements.length} handler={changeQuantityHandler} nav={props.navigation}/>);
    }
  }

  return (
    <ScrollView style={styles.screen}>
      {pizzaElements}
      {extraElements}
      <View style={styles.cartSummaryContainer}>
        <Pressable style={styles.cartCompleteOrderButton} onPress={onCompleteOrderPressHandler}><Text style={styles.cartCompleteOrderButtonText}>COMPLETE ORDER</Text></Pressable>
        <Text style={styles.cartSummaryTotal}>Total: {cartTotal.toFixed(2)}</Text>
      </View>
    </ScrollView>
  )
}