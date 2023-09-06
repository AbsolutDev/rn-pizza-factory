import { View, Text, Pressable } from 'react-native';
import { styles } from '../assets/styles';

export const SectionStepTitle = (props) => {
  return (
    <Pressable
      style={styles.sectionTitleContainer}
      onPress={() => props.pressHandler(Number(props.stage))}
    >
      <Text style={styles.sectionTitleText}>
        {props.sectionTitle}
      </Text>
      <Pressable
        style={(!props.buttonHandler || !props.show) ? {display: 'none'} : styles.doneButton}
        onPress={props.buttonHandler}
      >
        <Text style={styles.doneButtonText}>DONE</Text>
      </Pressable>
      <View style={styles.sectionTitleRightSide}>
        <Text style={!(props.totalPrice > 0) ? {display: 'none'} : styles.sectionTitlePrice}>
          £{props.totalPrice}
        </Text>
        <Text style={!(props.calories > 0) ? {display: 'none'} : styles.sectionTitleCalories}>
          {props.calories} kcal
        </Text>
      </View>
    </Pressable>
  )
}