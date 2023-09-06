import { View, ScrollView, Dimensions, Pressable } from "react-native";
import { useState } from "react";
import { PizzaVariant } from "./PizzaVariant";
import { DietaryIcon } from "./DietaryIcon";
import { AddPizzaButton } from "./AddPizzaButton";
import { styles } from "../assets/styles";

export const Pizza = (props) => {
  const [showSlideButtons, setShowSlideButtons] = useState(true);
  const [variantOnScreen, setVariantOnScreen] = useState(0);
  const pizzaVariants = [];
  const SCREEN_WIDTH = Dimensions.get('window').width;

  variantOnPressHandler = () => {
    props.selectHandler(props.data[0].id);
  }

  variantChoosePressHandler = (pizzaType) => {
    props.addHandler(props.data[variantOnScreen], pizzaType)
  }

  for (let pizzaVariantIndex in props.data) {
    pizzaVariants.push(
      <PizzaVariant
        key={pizzaVariantIndex}
        index={pizzaVariantIndex}
        data={props.data[pizzaVariantIndex]}
        showSlideButtons={showSlideButtons}
        variantsCount={props.data.length}
        handler={variantOnPressHandler}
      />
    )
  }

  if (pizzaVariants.length > 1) {
    return (
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          onScrollBeginDrag={() => {
            setShowSlideButtons(false);
            !props.selected && props.selectHandler(null)
          }}
          onMomentumScrollEnd={(e) => {
            setShowSlideButtons(true);
            setVariantOnScreen(Math.ceil(e.nativeEvent.contentOffset.x / SCREEN_WIDTH))
          }}
        >
          {pizzaVariants}
        </ScrollView>
        {props.selected && 
          <View style={styles.pizzaComponentBottom}>
            <AddPizzaButton handler={variantChoosePressHandler} />
            {props.data[variantOnScreen].glutenFreeOption && <AddPizzaButton type="gf" handler={variantChoosePressHandler} />}
          </View>
        }
      </View>
    )
  } else {
    return (
      <View>
        {pizzaVariants}
        {props.selected && 
          <View style={styles.pizzaComponentBottom}>
            <AddPizzaButton handler={variantChoosePressHandler} />
            {props.data[variantOnScreen].glutenFreeOption && <AddPizzaButton type="gf" handler={variantChoosePressHandler} />}
          </View>
        }
      </View>
    )
  }
}