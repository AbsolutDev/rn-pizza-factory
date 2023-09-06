import { View, ScrollView } from 'react-native';
import { ChoiceComponent } from './ChoiceComponent';
import { styles } from '../assets/styles';

export const ChooseSize = (props) => {
  const showAll = props.currentStage === Number(props.stage);
  
  const sizeComponentPressHandler = (index) => {
    if (props.currentSelection !== Number(index)) {
      props.handler(Number(index), false);
    } else {
      props.setStage(!showAll ? Number(props.stage) : Number(props.completedStage) + 1);
    }
  }

  const pizzaSizes = () => {
    const pizzaSizeElements = [];
    
    for (sizeIndex in props.sizes) {
      if (showAll || props.currentSelection === Number(sizeIndex)) {
        const data = {
          name: props.sizes[sizeIndex].name,
          description: props.sizes[sizeIndex].width + '", serves ' + props.sizes[sizeIndex].serves,
          calories: Math.ceil(props.baseSize.calories * props.baseTypeCaloriesMultiplier * props.sizes[sizeIndex].caloriesMultiplier ),
          price: props.sizes[sizeIndex].price,
        };
        pizzaSizeElements.push(<ChoiceComponent data={data} baseSize={props.baseSize} key={sizeIndex} index={sizeIndex} selected={props.currentSelection === Number(sizeIndex)} pressHandler={sizeComponentPressHandler} showAll={showAll} />);
      }
    }
    return pizzaSizeElements;
  }

  return (
    <ScrollView>
      <View>
        <View style={styles.sectionContent}>
          {pizzaSizes()}
        </View>
      </View>
    </ScrollView>
  )
}

