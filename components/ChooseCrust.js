import { View, ScrollView } from "react-native";
import { ChoiceComponent } from './ChoiceComponent';

export const ChooseCrust = (props) => {
  const showAll = props.currentStage === Number(props.stage);

  const crustComponentPressHandler = (index) => {
    if (props.currentSelection !== Number(index)) {
      props.handler(Number(index), false);
    } else {
      props.setStage(!showAll ? Number(props.stage) : Number(props.completedStage) + 1);
    }
  }

  const pizzaCrusts = () => {
    const pizzaCrustElements = [];

    for(crustIndex in props.crusts) {
      const filterOut = (props.filter.length > 0 || props.baseType!=='') && (((props.filter.indexOf('pb') >= 0 || props.baseType === 'pb') && !props.crusts[crustIndex].vegan) || ((props.filter.indexOf('vg') >= 0 || props.baseType === 'vg') && !props.crusts[crustIndex].vegetarian) || ((props.filter.indexOf('gf') >= 0 || props.baseType === 'gf') && !props.crusts[crustIndex].glutenFree));

      if (( showAll && !filterOut ) || props.currentSelection === Number(crustIndex)) {
        const data = {
          name: props.crusts[crustIndex].name,
          description: props.crusts[crustIndex].description,
          calories: Math.ceil(props.baseSize.calories * props.baseTypeCaloriesMultiplier * props.sizeTypeCaloriesMultiplier * (props.crusts[crustIndex].caloriesMultiplier - 1)),
          vegetarian: props.crusts[crustIndex].vegetarian,
          vegan: props.crusts[crustIndex].vegan && (props.baseType === 'pb'),
          glutenFree: props.crusts[crustIndex].glutenFree && (props.baseType === 'gf'),
          price: props.crusts[crustIndex].price * props.crustPriceMultiplier,
          image: props.crusts[crustIndex].image,
        }
        pizzaCrustElements.push(<ChoiceComponent large='true' data={data} key={crustIndex} index={crustIndex} selected={props.currentSelection === Number(crustIndex)} pressHandler={crustComponentPressHandler} showAll={showAll} />)
      }
    }
    return pizzaCrustElements;
  }

  return (
    <ScrollView>
      <View>
        <View>
          {pizzaCrusts()}
        </View>
      </View>
    </ScrollView>
  )
}