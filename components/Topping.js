import { View, Text, Image, Pressable } from "react-native";
import { DietaryIcon } from "./DietaryIcon";
import { PepperIcon } from "./PepperIcon";
import { Tag } from "./Tag";
import { styles } from "../assets/styles";

export const Topping = (props) => {
  const dietaryIcons = () => {
    const icons = [];
    props.data.vegetarian && icons.push(<DietaryIcon type='vg' key={icons.length+1} />);
    props.data.vegan && icons.push(<DietaryIcon type='pb' key={icons.length+1} />);
    props.data.glutenFree && icons.push(<DietaryIcon type='gf' key={icons.length+1} />);
    return icons;
  }

  const tagIcons = () => {
    const icons = [];
    for (let tagIndex in props.data.tags) {
      icons.push(<Tag key={tagIndex} text={props.data.tags[tagIndex]} />)
    }
    return icons;
  }

  const pepperIcons = () => {
    const icons = [];
    for (let i=0;i<props.data.spicy;i++) {
      icons.push(<PepperIcon key={i} />)
    }
    return icons;
  }

  return (
    <Pressable
      style={[styles.toppingContainer, (props.selected && props.showAll && !props.highlight) && styles.toppingContainerSelected, (props.highlight && props.showAll) && styles.toppingContainerHighlighted]}
      onPress={() => props.pressHandler(Number(props.index), props.section, props.data.qty)}
    >
      <View style={styles.toppingImageContainer}>
        <Image style={styles.toppingImage} source={props.data.image} />
      </View>

      <View style={styles.toppingInfo}>
        <View style={styles.toppingInfoTop}>
          <Text style={[styles.toppingText, styles.toppingName]}>{props.data.name}</Text>
          {props.data.tags && tagIcons()}
        </View>
        <View style={styles.toppingInfoBottom}>
          <Text style={[styles.toppingText, styles.toppingDescription]} textBreakStrategy='balanced'>{props.data.description}</Text>
          <Text style={[styles.toppingText, styles.toppingCalories]}>{props.data.calories} kcal</Text>
          {dietaryIcons()}{pepperIcons()}
        </View>
      </View>
      <Text style={[styles.toppingText, styles.toppingQty, (props.data.qty === 1 && props.showAll) ? styles.toppingQtySingle : (props.data.qty === 2 && styles.toppingQtyExtra)]}>{(props.data.qty === 1 && props.showAll) ? "Extra?" : (props.data.qty === 2 && "Extra")}</Text>
      <Text style={[styles.choiceComponentText, styles.toppingPrice]}>{(Number(props.data.price) === 0 || (props.section === 0 && props.data.qty < 2)) ? 'free' : (props.data.qty > 0) && ('+£' + (Number(props.data.price) * (props.section === 0 ? props.data.qty - 1 : props.data.qty)).toFixed(2))}</Text>
    </Pressable>
  )
}