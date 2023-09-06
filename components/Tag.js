import { Text, StyleSheet } from "react-native";
import { styles } from "../assets/styles";

export const Tag = ({text}) => {
  return (
    <Text style={[styles.itemTag]}>
      {text.toUpperCase()}
    </Text>
  )
}