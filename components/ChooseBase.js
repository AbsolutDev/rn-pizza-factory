import { View, ScrollView } from 'react-native';
import { ChoiceComponent } from './ChoiceComponent';
import { DietaryLegend } from './DietaryLegend';
import { styles } from '../assets/styles';

export const ChooseBase = (props) => {
  const showAll = props.currentStage === Number(props.stage);

  const baseComponentPressHandler = (index) => {
    if (props.currentSelection !== Number(index)) {
      props.handler(Number(index), false);
    } else {
      props.setStage(!showAll ? Number(props.stage) : Number(props.completedStage) + 1);
    }
  }

  const pizzaBases = () => {
    const pizzaBaseElements = [];

    for (baseIndex in props.bases) {
      const filterOut = (props.filter.length > 0) && ((props.filter.indexOf('pb') >= 0 && !props.bases[baseIndex].vegan) || (props.filter.indexOf('vg') >= 0 && !props.bases[baseIndex].vegetarian) || (props.filter.indexOf('gf') >= 0 && !props.bases[baseIndex].glutenFree));
      if ((showAll && !filterOut)|| props.currentSelection === Number(baseIndex)) {
        const data = {
          name: props.bases[baseIndex].name,
          description: props.bases[baseIndex].description,
          vegetarian: props.bases[baseIndex].vegetarian,
          vegan: props.bases[baseIndex].vegan,
          glutenFree: props.bases[baseIndex].glutenFree,
        };
        pizzaBaseElements.push(<ChoiceComponent data={data} key={baseIndex} index={baseIndex} selected={props.currentSelection === Number(baseIndex)} pressHandler={baseComponentPressHandler} showAll={showAll} />);
      }
    }
    return pizzaBaseElements;
  }

  return (
    <ScrollView>
      <DietaryLegend show={showAll} setFilter={props.setFilter} filter={props.filter} />
      <View style={styles.sectionContent}>
        {pizzaBases()}
      </View>
    </ScrollView>
  )
}

