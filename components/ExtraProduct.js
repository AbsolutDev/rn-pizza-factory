import { View, Text, Image, ToastAndroid } from "react-native";
import { Tag } from "./Tag";
import { DietaryIcon } from "./DietaryIcon";
import { PepperIcon } from "./PepperIcon";
import { ChangeQuantity } from "./ChangeQuantity";
import { styles } from "../assets/styles";

export const ExtraProduct = (props) => {
  const showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  }

  const tagIcons = () => {
    const icons = [];
    for (let tagIndex in props.data.tags) {
      icons.push(
        <Tag key={tagIndex} text={props.data.tags[tagIndex]} />
      )
    }
    return icons;
  }

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

  const quantityChangeHandler = (qty) => {
   if (qty === 0) {
    //Remove product
    props.handler("remove", props.productCode)
   } else if (qty === 1 && props.qty === 0) {
    //Add product
    props.handler("add", props.index)
   } else {
    //Change quantity
    props.handler("change", props.productCode, qty)
   }
   showToast("Cart updated.")
  }

  return (
    <View style={styles.extraProductComponent}>
      <View style={styles.extraProductComponentTop}>
        <Image style={styles.extraProductImage} source={props.data.image}/>
        <View style={styles.extraProductInfo}>
          <Text style={[styles.extraProductComponentText, styles.extraProductName]}>{props.data.name}<Text style={styles.extraProductSize}> {props.data.size}</Text></Text>
          <View style={styles.extraProductTagIconsWrapper}>
            {tagIcons()}
          </View>
          <Text style={[styles.extraProductComponentText, styles.extraProductDescription]}>{props.data.description}</Text>
          <Text style={[styles.extraProductComponentText, styles.extraProductCalories]}>{props.data.calories}kcal{props.data.serves && ', serves ' + props.data.serves}</Text>
          <View style={styles.extraProductDietaryAndPepperIconsContainer}>
            <View style={styles.extraProductDietaryIcons}>
              {dietaryIcons()}
            </View>
            <View style={styles.extraProductPepperIcons}>
              {pepperIcons()}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.extraProductComponentBottom}>
        <ChangeQuantity qty={props.qty} minQty={0} maxQty={props.maxQty} handler={(qty) => quantityChangeHandler(qty)} />
        <Text style={[styles.extraProductComponentText, styles.extraProductPrice]}>£{props.data.price.toFixed(2)}</Text>
      </View>     
    </View>
  )
}