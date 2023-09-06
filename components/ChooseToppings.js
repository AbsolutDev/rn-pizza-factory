import { View, Text, ScrollView, ToastAndroid, Alert, Switch } from "react-native";
import { SideTitle } from './SideTitle';
import { DietaryLegend } from './DietaryLegend';
import { Topping } from './Topping';
import { styles } from '../assets/styles';

export const ChooseToppings = (props) => {
  const sides = props.isHalfHalf ? 2 : 1;
  let baseExtras = props.currentSelection[0].length > 2 ? props.currentSelection[0].length - 2 : 0;
  let selectedComplimentaryToppings = [0,0];

  const showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  }

  const showAll = props.currentStage === Number(props.stage);

  const toppingComponentPressHandler = (index, section, qty) => {
    if (showAll) {
      const maxToppingsSelected = (props.currentSelection[section].length - selectedComplimentaryToppings[section-1]) >= (props.maxToppings - baseExtras);
      switch(qty) {
        case 0:
          //Request to add topping
          if (props.toppings[index].group) {
            //Topping is in a group
            let found = false;
            for (let toppingIndex in props.currentSelection[section]) {
              if (props.currentSelection[section][toppingIndex] !== null && props.toppings[props.currentSelection[section][toppingIndex]].group === props.toppings[index].group) {
                props.handler([props.currentSelection[section][toppingIndex],index], "replace", section);
                found = true;
                break;
              }
            }
            !found && props.handler(index, "add", section);
          } else {
            if (!maxToppingsSelected || props.toppings[index].isComplimentary) {
              props.handler(index,"add",section);
            } else {
              showToast(`Maximum number of ${props.maxToppings} toppings selected.`);
            }
          }
          break;
        case 1:
          //Request to add extra topping
          if (!maxToppingsSelected  || props.toppings[index].isComplimentary) {
            props.handler(index, "add", section);
          } else {
            Alert.alert('', `Do you want to remove?`,[
              {
                text: 'Cancel',
                style: 'cancel'
              },
              {
                text: 'Remove',
                onPress: () => props.handler(index, "remove", section)
              }
            ],{
              cancelable: true
            })
          }
          break;
        case 2:
          //Request to remove topping
          if (section === 0 && (props.currentSelection[0][0] === null || props.currentSelection[0][1] === null)) {
            showToast(`Select at least one cheese or sauce`);
          } else {
            props.handler(index, "remove", section)
          }
          break;
      }
    } else {
      props.setStage(Number(props.stage));
    }
  }

  const pizzaToppings = () => {
    const pizzaToppingElements = [[],[],[]];
    if (showAll || props.completedStage >= Number(props.stage) ) {
      let itemKey = 0;
      for(let toppingIndex in props.toppings) {
        const filterOut = ((props.filter.length > 0) && ((props.filter.indexOf('pb') >= 0 && !props.toppings[toppingIndex].vegan) || (props.filter.indexOf('vg') >= 0 && !props.toppings[toppingIndex].vegetarian) || (props.filter.indexOf('gf') >= 0 && !props.toppings[toppingIndex].glutenFree)));
        const isSelected = props.currentSelection[0].indexOf(Number(toppingIndex)) >= 0 || props.currentSelection[1].indexOf(Number(toppingIndex)) >= 0 || props.currentSelection[2].indexOf(Number(toppingIndex)) >= 0;
        if (isSelected || !filterOut) {
          for (let section=0;section<sides+1;section++) {
            if (section > 0 && sides === 2 && pizzaToppingElements[section].length === 0) {
              pizzaToppingElements[section].push(
                <SideTitle
                  key={itemKey}
                  side={section === 1 ? 'left' : 'right'}
                  calories={Math.ceil(props.toppingsCalories[section] * props.sizeTypeCaloriesMultiplier / 2)}
                />)
              itemKey++;
            }
            if ((props.toppings[toppingIndex].isBase && section === 0) || ((!props.toppings[toppingIndex].isBase && section > 0)) ) {
              let count = 0;
              //Count occurrences
              for (let topping of props.currentSelection[section]) {
                topping === Number(toppingIndex) && count++;
              }
              if (showAll || count > 0) {
                if (props.toppings[toppingIndex].isComplimentary) {
                  selectedComplimentaryToppings[section-1] += count
                }
                const data = {
                  name: props.toppings[toppingIndex].name,
                  description: props.toppings[toppingIndex].description,
                  calories: (sides === 2 && section > 0) ? Math.ceil(props.toppings[toppingIndex].calories * props.sizeTypeCaloriesMultiplier / 2) : Math.ceil(props.toppings[toppingIndex].calories * props.sizeTypeCaloriesMultiplier),
                  vegetarian: props.toppings[toppingIndex].vegetarian,
                  vegan: props.toppings[toppingIndex].vegan,
                  glutenFree: props.toppings[toppingIndex].glutenFree,
                  spicy: props.toppings[toppingIndex].spicy,
                  image: props.toppings[toppingIndex].image,
                  group: props.toppings[toppingIndex].group,
                  tags: props.toppings[toppingIndex].tags,
                  price: props.toppingPrices[toppingIndex],
                  qty: count,
                }
                pizzaToppingElements[section].push(
                  <Topping
                    key={itemKey}
                    index={toppingIndex}
                    data={data}
                    showAll={showAll}
                    selected={count>0}
                    highlight={isSelected && filterOut}
                    pressHandler={toppingComponentPressHandler}
                    section={section}
                  />
                );
                itemKey++;
              }
            }
          }
        }
      }
    }
    return pizzaToppingElements;
  }
  return (
    <ScrollView>
      <View>
        <DietaryLegend
          show={showAll}
          setFilter={props.setFilter}
          filter={props.filter}
        />
        <View style={[(!showAll || !props.allowHalfHalf) && {display: 'none'}, styles.halfHalfSwitchContainer]}>
          <Text style={styles.halfHalfSwitchText}>
            Split half and half?
          </Text>
          <Switch
            trackColor={styles.halfHalfFilterSwitch.trackColor}
            thumbColor={props.isHalfHalf ? styles.halfHalfFilterSwitch.thumbColor.true : styles.halfHalfFilterSwitch.thumbColor.false}
            ios_backgroundColor={styles.halfHalfFilterSwitch.iosBackgroundColor}
            value={props.isHalfHalf}
            onValueChange={props.setHalfHalf}
          />
        </View>
        <View style={styles.sectionContent}>
          {pizzaToppings()}
        </View>
      </View>
    </ScrollView>
  )
}