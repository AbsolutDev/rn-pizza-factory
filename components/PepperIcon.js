import { View, Image } from "react-native";
import { styles } from "../assets/styles";

export const PepperIcon = () => {
  return (
    <Image source={require('../assets/spicy.png')} style={[styles.pepperIcon]}/>
  )
}