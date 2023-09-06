import { Text } from "react-native";
import { styles } from "../assets/styles";

export const DietaryIcon = (props) => {
  const dietaryIconColour = props.type === 'gf' ? styles.dietaryGf : props.type === 'vg' ? styles.dietaryVg : styles.dietaryPb;

  return (
    <Text style={[styles.dietaryIcon, dietaryIconColour]}>
      <Text>{props.type.toUpperCase()}</Text>
    </Text>
  )
}