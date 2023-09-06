import { View, Text, Pressable } from "react-native";
import { styles } from "../assets/styles";

export const ChangeQuantity = ({qty, maxQty, minQty, handler}) => {
  return (
    <View style={styles.qtyButtonContainer}>
      <Pressable onPress={() => qty > minQty && handler(qty-1)}>
        <Text style={[styles.qtyButton, qty === minQty && styles.qtyButtonInactive]}>
          -
        </Text>
      </Pressable>
      <Text style={styles.qtyText}>
        {qty}
      </Text>
      <Pressable onPress={() => qty <= maxQty && handler(qty+1)}>
        <Text style={[styles.qtyButton, qty === maxQty && styles.qtyButtonInactive]}>
          +
        </Text>
      </Pressable>
    </View>
  )
}