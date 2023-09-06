import { View, Text } from 'react-native';
import { styles } from '../assets/styles';

export const SideTitle = ({side, calories}) => {
  return (
    <View style={styles.sideTitle}>
      <Text style={styles.sideTitleText}>{side === 'left' ? 'Left' : 'Right'} side</Text>
      <Text style={!calories ? {display: 'none'} : styles.sideTitleCalories}>{calories} kcal</Text>
    </View>
  )
}