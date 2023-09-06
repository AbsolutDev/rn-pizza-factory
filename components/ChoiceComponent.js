import { View, Text, Image, Pressable } from "react-native";
import { DietaryIcon } from "./DietaryIcon";
import { styles } from "../assets/styles";

export const ChoiceComponent = (props) => {
  const dietaryIcons = () => {
    const icons = [];
    props.data.vegetarian && icons.push(<DietaryIcon type='vg' key={icons.length+1} />);
    props.data.vegan && icons.push(<DietaryIcon type='pb' key={icons.length+1} />);
    props.data.glutenFree && icons.push(<DietaryIcon type='gf' key={icons.length+1} />);
    return icons;
  }

  const showPrice = !(props.data.price === undefined);
  return (
    <Pressable
      style={[styles.choiceComponent, props.large && styles.choiceComponentLarge, (props.selected && props.showAll) && styles.choiceComponentSelected]}
      onPress={() => props.pressHandler(props.index)}
    >
      <View style={props.data.image ? styles.choiceComponentLeftSide : {display: 'none'}} >
        <Image style={[styles.choiceComponentImage, props.large && styles.choiceComponentImageLarge]} source={props.data.image}/>
      </View>

      <View style={styles.choiceComponentInfo}>
        <View style={styles.choiceComponentInfoTop}>
          <Text style={[styles.choiceComponentText, styles.choiceComponentName]}>{props.data.name}</Text>
          {dietaryIcons()}
        </View>
        <Text style={[styles.choiceComponentText, styles.choiceComponentDescription]} textBreakStrategy='balanced'>{props.data.description}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={[!props.large && {display: 'none'}, styles.choiceComponentText, styles.choiceComponentCalories]}>{props.data.calories!==0 && ((props.data.calories > 0) && '+') + props.data.calories + ' kcal'}</Text>
          <Text style={[!props.large && {display: 'none'}, styles.choiceComponentText, styles.choiceComponentPriceSmall]}>{props.data.price!==0 && ((props.data.price > 0) && '+') + '£' + Number(props.data.price).toFixed(2)}</Text>
        </View>
      </View>

      <View style={[(!showPrice || props.large) && {display: 'none'}, styles.choiceComponentTotal]}>
        <Text style={[!showPrice && {display: 'none'}, styles.choiceComponentText, styles.choiceComponentPrice]}>£{props.data.price}</Text>
        <Text style={[props.large && {display: 'none'}, styles.choiceComponentText, styles.choiceComponentCalories]}>{props.data.calories} kcal</Text>
      </View>
    </Pressable>
  )
}

