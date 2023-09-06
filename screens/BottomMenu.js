import { View, Text, Image, Pressable } from 'react-native';
import { styles } from '../assets/styles.js';

const images = {
  homeIcon: require('../assets/home.png'),
  userIcon: require('../assets/user.png'),
}

export const BottomMenu = (props) => {
  return (
    <View style={styles.bottomMenu}>
      <View style={styles.homeIconContainer}>
        <Image source={images.homeIcon} style={styles.homeIcon}></Image>
        <Text style={styles.homeText}>HOME</Text>
      </View>
      <View>
        <Text></Text>
      </View>
      <Pressable style={styles.userIconContainer} onPress={props.countCartItems}>
        <Image source={images.userIcon} style={styles.userIcon}></Image>
        <Text style={styles.userText}>USER</Text>
      </Pressable>
    </View>
  )
};