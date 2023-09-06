import { View, Text, Image, Pressable } from "react-native";
import { DietaryIcon } from "./DietaryIcon";
import { PepperIcon } from "./PepperIcon";
import { ChangeQuantity } from "./ChangeQuantity";
import { DATA } from "../assets/data";
import { styles } from "../assets/styles";

export const CartExtra = (props) => {
  const binImage = require('../assets/bin.png');
  
  const dietaryIcons = () => {
    const icons = [];
    props.data.vegetarian && icons.push(<DietaryIcon type='vg' key={icons.length+1} />);
    props.data.vegan && icons.push(<DietaryIcon type='pb' key={icons.length+1} />);
    props.data.glutenFree && icons.push(<DietaryIcon type='gf' key={icons.length+1} />);
    return icons;
  }

  const pepperIcons = () => {
    const icons = [];
    for (let i=0;i<props.data.spicy;i++) {
      icons.push(<PepperIcon key={i} />)
    }
    return icons;
  }

  const changeQuantityHandler = (qty) => {
    props.handler(props.data.productCode, qty);
  }

  return (
    <View style={styles.cartItemComponent}>
      <View style={styles.cartItemTopContainer}>
        <Image style={styles.cartItemImage} source={props.data.image} />  
        <View style={styles.cartItemInfoContainer}>
          <View style={styles.cartItemNameAndBinContainer}>
            <Text style={[styles.cartItemText, styles.cartItemName]}>{props.data.name}<Text style={styles.extraProductSize}> {props.data.size}</Text></Text>
            <Pressable onPress={() => changeQuantityHandler(0)} style={styles.cartItemBinButtonContainer}>
              <Image style={styles.cartItemBinButton} source={binImage} />
            </Pressable>
          </View>

          {props.data.description && <Text style={[styles.cartItemText, styles.cartItemInfo]}>{props.data.description}</Text>}
          
          <View style={styles.cartItemDietaryAndPepperIconsContainer}>
            <View style={styles.cartItemDietaryIcons}>
              {dietaryIcons()}
            </View>
            <View style={styles.cartItemPepperIcons}>
              {pepperIcons()}
            </View>
          </View>

          <Text style={[styles.cartItemText, styles.cartItemInfo]}>{props.data.calories}kcal</Text>
        </View>

      </View>
      
      <View style={styles.cartItemQtyAndPriceContainer}>
        <ChangeQuantity qty={props.data.quantity} minQty={0} maxQty={props.data.maxQuantity} handler={(qty) => changeQuantityHandler(qty)} />
        <Text style={[styles.cartItemText, styles.cartItemPrice]}>£{(props.data.price * props.data.quantity).toFixed(2)}</Text>
      </View>
    </View>
  )
}