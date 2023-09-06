import { Text, Image, Pressable, ToastAndroid, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setConfirmExit } from "../features/status.js";
import { selectCartSize } from '../features/cart.js';
import { selectConfirmExit } from "../features/status.js";
import { styles } from "../assets/styles";

const images = {
  cartIcon: require('../assets/cart.png'),
}

export const ShoppingCartButton = (props) => {
  const dispatch = useDispatch();
  const cartItemsCount = useSelector(selectCartSize);
  const confirmExit = useSelector(selectConfirmExit);

  const showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  }

  const onPressHandler = () => {
    if(cartItemsCount) {
      if (!confirmExit) {
        props.nav.navigate("ShoppingCart")
      } else {
        Alert.alert('', `Discard changes?`,[
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Discard',
            onPress: () => {
              dispatch(setConfirmExit(false))
              props.nav.navigate("ShoppingCart")

            }
          }
        ],{
          cancelable: true
        })
      }
      
    } else {
      showToast("Your cart is currently empty.")
    }
    
  }

  return (
    <Pressable style={styles.cartIconContainer} onPress={onPressHandler}>
      <Image source={images.cartIcon} style={styles.cartIcon} ></Image>
      <Text style={styles.cartText}>{cartItemsCount}</Text>
    </Pressable>
  )
}