import { View, Text, Image, Pressable } from "react-native";
import { DietaryIcon } from "./DietaryIcon";
import { PepperIcon } from "./PepperIcon";
import { ChangeQuantity } from "./ChangeQuantity";
import { DATA } from "../assets/data";
import { styles } from "../assets/styles";

export const CartPizza = (props) => {
  const binImage = require('../assets/bin.png');

  let toppingList = ['','',''];
  for (let toppingSectionIndex in props.data.toppings) {
    const toppings = [];
    for (let toppingIndex in props.data.toppings[toppingSectionIndex]) {
      if (toppings.indexOf(props.data.toppings[toppingSectionIndex][toppingIndex]) < 0) {
        //First seen this topping
        toppingList[toppingSectionIndex] += toppingList[toppingSectionIndex].length === 0 ? DATA.toppings[props.data.toppings[toppingSectionIndex][toppingIndex]].name : ', ' + DATA.toppings[props.data.toppings[toppingSectionIndex][toppingIndex]].name.toLowerCase()
        if (props.data.toppings[toppingSectionIndex].slice(toppingIndex+1).indexOf(props.data.toppings[toppingSectionIndex][toppingIndex]) >= 0) {
          //Topping has extra
          toppingList[toppingSectionIndex] += ' (+ extra)'
        }
        toppings.push(props.data.toppings[toppingSectionIndex][toppingIndex]);
      }
    }
  }
  
  const dietaryIcons = () => {
    const icons = [];
    props.data.isVegetarian && icons.push(<DietaryIcon type='vg' key={icons.length+1} />);
    props.data.isVegan && icons.push(<DietaryIcon type='pb' key={icons.length+1} />);
    props.data.isGlutenFree && icons.push(<DietaryIcon type='gf' key={icons.length+1} />);
    return icons;
  }

  const pepperIcons = () => {
    const icons = [];
    for (let i=0;i<props.data.isSpicy;i++) {
      icons.push(<PepperIcon key={i} />)
    }
    return icons;
  }

  const changeQuantityHandler = (qty) => {
    props.handler(props.data.productCode, qty);
  }

  const editProduct = () => {
    props.nav.navigate('MakeYourOwn', {action: 'edit', title: 'Edit product', data: props.data});
  }

  return (
    <Pressable style={styles.cartItemComponent} onPress={editProduct}>
      <View style={styles.cartItemTopContainer}>
        <Image style={styles.cartItemImage} source={props.data.image} />  
        <View style={styles.cartItemInfoContainer}>
          <View style={styles.cartItemNameAndBinContainer}>
            <Text style={[styles.cartItemText, styles.cartItemName]}>{props.data.name}</Text>
            <Pressable onPress={() => changeQuantityHandler(0)} style={styles.cartItemBinButtonContainer}>
              <Image style={styles.cartItemBinButton} source={binImage} />
            </Pressable>
          </View>
          
          <Text style={[styles.cartItemText, styles.cartItemInfo]}>{DATA.sizes[props.data.size].name} {DATA.sizes[props.data.size].width}" (serves {DATA.sizes[props.data.size].serves})</Text>
          
          <Text style={[styles.cartItemText]}>{DATA.crust[props.data.crust].name}, {DATA.base[props.data.base].name.toLowerCase()} base</Text>
          
          <View style={styles.cartItemDietaryAndPepperIconsContainer}>
            <View style={styles.cartItemDietaryIcons}>
              {dietaryIcons()}
            </View>
            <View style={styles.cartItemPepperIcons}>
              {pepperIcons()}
            </View>
          </View>

          <Text style={[styles.cartItemText, styles.cartItemInfo]}>{props.data.calories}kcal</Text>

          <View style={styles.cartPizzaToppingsContainer}>
            <Text style={[styles.cartItemText, styles.cartPizzaToppingList]} textBreakStrategy='simple'>{toppingList[0] + ((!props.data.isHalfHalf && toppingList[1]) ? ', ' + toppingList[1].toLowerCase() : '')}</Text>
          </View>

          {props.data.isHalfHalf && 
            <View style={styles.cartPizzaToppingsContainer}>
                <Text style={[styles.cartItemText, styles.cartPizzaToppingList]} textBreakStrategy='simple'>
                  <Text style={styles.cartPizzaToppingLeftHalf}>Left half:</Text> {toppingList[1].toLowerCase()}
                </Text>
                <Text style={[styles.cartItemText, styles.cartPizzaToppingList]} textBreakStrategy='simple'>
                  <Text style={styles.cartPizzaToppingRightHalf}>Right half:</Text> {toppingList[2].toLowerCase()}
                </Text>
            </View>
          }
        </View>

      </View>

      <View style={styles.cartItemQtyAndPriceContainer}>
        <ChangeQuantity qty={props.data.quantity} minQty={0} maxQty={props.data.maxQuantity} handler={(qty) => changeQuantityHandler(qty)} />
        <Text style={[styles.cartItemText, styles.cartItemPrice]}>£{(props.data.price * props.data.quantity).toFixed(2)}</Text>
      </View>
    </Pressable>
  )
}