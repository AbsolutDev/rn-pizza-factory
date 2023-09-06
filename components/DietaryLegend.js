import { Text, View, Pressable } from "react-native";
import { DietaryIcon } from "./DietaryIcon";
import { styles } from "../assets/styles";

export const DietaryLegend = (props) => {
  return (
    <View style={[!props.show && {display: 'none'}, styles.dietaryLegendContainer]} >
      <Pressable style={[styles.dietaryLegendItem, props.filter.indexOf('vg')>=0 && styles.dietaryLegendItemSelected]} onPress={() => {!props.inactive && props.setFilter('vg')}}>
        <DietaryIcon type='vg' />
        <Text style={[styles.dietaryLegendText, (props.filter.indexOf('vg')<0 && props.filter.length>0) && styles.dietaryLegendTextUnselected]} >Vegetarian</Text>
      </Pressable>
      <Pressable style={[styles.dietaryLegendItem, props.filter.indexOf('pb')>=0 && styles.dietaryLegendItemSelected]} onPress={() => {!props.inactive && props.setFilter('pb')}}>
        <DietaryIcon type='pb' />
        <Text style={[styles.dietaryLegendText, (props.filter.indexOf('pb')<0 && props.filter.length>0) && styles.dietaryLegendTextUnselected]} >Plant-based</Text>
      </Pressable>
      <Pressable style={[styles.dietaryLegendItem, props.filter.indexOf('gf')>=0 && styles.dietaryLegendItemSelected]} onPress={() => {!props.inactive && props.setFilter('gf')}}>
        <DietaryIcon type='gf' />
        <Text style={[styles.dietaryLegendText, (props.filter.indexOf('gf')<0 && props.filter.length>0) && styles.dietaryLegendTextUnselected]} >Gluten Free</Text>
      </Pressable>
    </View>
  )
}