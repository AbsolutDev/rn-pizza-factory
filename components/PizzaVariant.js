import { Text, View, Pressable, Image } from "react-native";
import { useEffect } from "react";
import { DietaryIcon } from "./DietaryIcon";
import { styles } from "../assets/styles";

export const PizzaVariant = (props) => {
  const dietaryIcons = () => {
    const icons = [];
    props.data.isVegetarian && icons.push(<DietaryIcon type='vg' key={icons.length+1} />);
    props.data.isVegan && icons.push(<DietaryIcon type='pb' key={icons.length+1} />);
    props.data.isGlutenFree && icons.push(<DietaryIcon type='gf' key={icons.length+1} />);
    return icons;
  }

  return (
    <View>
      <View style={styles.pizzaComponentVariant}>
        <View style={[styles.pizzaVariantSideContainer, styles.pizzaVariantSideLeftContainer]}>
          {(Number(props.index) > 0 && props.showSlideButtons) && <Text style={[styles.pizzaComponentText,styles.pizzaVariantMoveButton, styles.pizzaVariantMoveLeftButton]}>&#60;</Text>}
        </View>
        <Pressable style={styles.pizzaComponentVariantElement} onPress={() => props.handler()} key={props.index}>
          <View style={styles.pizzaImageContainer}>
            <Image style={styles.pizzaImage} source={props.data.image}/>
          </View>
          <View style={styles.pizzaInfoContainer}>
            <View style={styles.pizzaInfoContainerTop}>
              <Text style={[styles.pizzaComponentText, styles.pizzaComponentName]}>{props.data.name}</Text>
              <View style={styles.dietaryIconsContainer}>
                {dietaryIcons()}
              </View>
            </View>
            <View style={styles.pizzaInfoToppingsListContainer}>
              <Text style={[styles.pizzaComponentText, styles.pizzaInfoToppingsList]} textBreakStrategy='simple'>
                {props.data.toppingNames}
              </Text>
            </View>
          </View>
        </Pressable>
        <View style={[styles.pizzaVariantSideContainer, styles.pizzaVariantSideRightContainer]}>
          {((Number(props.index) < props.variantsCount - 1) && props.showSlideButtons) && <Text style={[styles.pizzaComponentText, styles.pizzaVariantMoveButton, styles.pizzaVariantMoveRightButton]}>&#62;</Text>}
        </View>
      </View>
    </View>
  )
}