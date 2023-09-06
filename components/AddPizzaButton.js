import { Text, Pressable } from "react-native";
import { styles } from "../assets/styles";

export const AddPizzaButton = (props) => {
  let buttonText = '';
  let buttonStyle = []

  switch (props.type) {
    case 'gf':
      buttonText = 'Select Gluten Free';
      buttonStyle = [styles.addPizzaButton,styles.addPizzaButtonGf];
      textStyle= [styles.addPizzaButtonText, styles.addPizzaButtonTextGf]
      break;
    default:
      buttonText = 'Select'
      buttonStyle = [styles.addPizzaButton];
      textStyle = [styles.addPizzaButtonText];
  }
  return (
    <Pressable style={buttonStyle} onPress={() => props.handler(props.type)}>
      <Text style={textStyle}>{buttonText}</Text>
    </Pressable>
  )
}