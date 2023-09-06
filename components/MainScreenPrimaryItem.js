import { Text, ImageBackground, Pressable, View } from 'react-native';
import { styles } from '../assets/styles.js';
import { DATA } from '../assets/data.js';

const images = {
  makeYourOwn: require('../assets/makeYourOwn.png'),
  chooseAndCustomize: require('../assets/chooseAndCustomize.png'),
  sides: require('../assets/sides.png'),
  desserts: require('../assets/desserts.png'),
  drinks: require('../assets/drinks.png'),
}

export const MainScreenPrimaryItem = (props) => {
  return (
    <Pressable onPress={() => props.nav.navigate(props.dest, {productCategory: props.category, data: DATA[props.category]})}>
      <ImageBackground style={styles.mainScreenPrimaryItem} source={images[props.category]}>
        <View style={styles.mainScreenPrimaryTextContainer}>
          <View style={styles.mainScreenPrimaryTextRightContainer}>
            <Text style={styles.mainScreenPrimaryText}>
              {props.mainText}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  )
}