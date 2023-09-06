import { ImageBackground, ScrollView } from 'react-native';
import { MainScreenPrimaryItem } from '../components/MainScreenPrimaryItem.js';
import { styles } from '../assets/styles.js';

const images = {
  appBackground: require('../assets/background.png'),
}

export const MainScreen = (props) => {
  const nav = props.navigation;

  return (
    <ScrollView style={styles.screen}>
      <ImageBackground source={images.appBackground} resizeMode='cover' style={styles.appBackground}>
        <MainScreenPrimaryItem nav={nav} dest='MakeYourOwn' mainText='Make Your Own' category='makeYourOwn' />  
        <MainScreenPrimaryItem nav={nav} dest='ChooseAndCustomize' mainText='Choose and Customize' category='chooseAndCustomize' />
        <MainScreenPrimaryItem nav={nav} dest='ExtrasScreen' mainText='Sides' category='sides' />
        <MainScreenPrimaryItem nav={nav} dest='ExtrasScreen' mainText='Desserts' category='desserts' />
        <MainScreenPrimaryItem nav={nav} dest='ExtrasScreen' mainText='Drinks' category='drinks' />
      </ImageBackground>
    </ScrollView>
  )
}