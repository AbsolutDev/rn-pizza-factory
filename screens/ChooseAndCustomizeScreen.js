import { Text, ScrollView } from 'react-native';
import { useState } from 'react';
import { DietaryLegend } from '../components/DietaryLegend.js';
import { Pizza } from '../components/Pizza.js';
import { DATA } from '../assets/data.js';
import { styles } from '../assets/styles';

export const ChooseAndCustomizeScreen = (props) => {
  const [selectedPizza, setSelectedPizza] = useState({
    pizza: null,
    variant: 0
  });

  const toppingIdToIndex = (id) => {
    for (let toppingIndex in DATA.toppings) {
      if (DATA.toppings[toppingIndex].id === id) {
        return toppingIndex;
      }
    }
  };

  const crustIdToIndex = (id) => {
    for (let crustIndex in DATA.crust) {
      if (DATA.crust[crustIndex].id === id) {
        return crustIndex;
      }
    }
  }

  const baseIdToIndex = (id) => {
    for (let baseIndex in DATA.base) {
      if (DATA.base[baseIndex].id === id) {
        return baseIndex;
      }
    }
  }

  const pizzaOnPressHandler = (pizzaId) => {
    (pizzaId === null || selectedPizza.pizza === pizzaId) ? setSelectedPizza({...selectedPizza, pizza: null}) : setSelectedPizza({...selectedPizza, pizza: pizzaId});
  }

  const addPizzaPressHandler = (selectedPizzaData, selectedPizzaType) => {
    const toppings = [[null, null], []];
    selectedPizzaData.toppings.forEach(item => {
      if (DATA.toppings[item].isBase === 1) {
        if (toppings[0][0] === null) {
          toppings[0][0] = Number(item);
        } else {
          toppings[0].push(Number(item))
        }
      } else if (DATA.toppings[item].isBase === 2) {
        if (toppings[0][1] === null) {
          toppings[0][1] = Number(item);
        } else {
          toppings[0].push(Number(item))
        }
      } else {
        toppings[1].push(Number(item))
      }
    })
    const pizzaSelection = {
      base: Number(selectedPizzaData.base),
      crust: Number(selectedPizzaData.crust),
      image: selectedPizzaData.image,
      makeGlutenFree: selectedPizzaType === 'gf',
      name: selectedPizzaData.name,
      pizzaId: Number(selectedPizzaData.id),
      productType: 'custom',
      title: 'Make It Your Own',
      toppings: {
        0: [...toppings[0]],
        1: [...toppings[1]],
        2: []
      },
    }
    props.navigation.navigate('MakeYourOwn', {action: 'customize', title: 'Customize Your Pizza', data: pizzaSelection})
  }

  const pizzaElements = () => {
    const pizzaItems = [];
    for (let pizzaIndex in DATA.classicPizzas) {
      let pizzaVariants=[];
      let toppings = [];
      let toppingNames = '';
      let crustDataIndex = crustIdToIndex(DATA.classicPizzas[pizzaIndex].crust);
      let baseDataIndex = baseIdToIndex(DATA.classicPizzas[pizzaIndex].base);
      let isVegetarian = true;
      let isVegan = false;
      let isGlutenFree = true;
      let vegetarianOption = true;
      let veganOption = true;
      let glutenFreeOption = true;
      for (let toppingIndex in DATA.classicPizzas[pizzaIndex].toppings) {
        const toppingDataIndex = toppingIdToIndex(DATA.classicPizzas[pizzaIndex].toppings[toppingIndex]);
        toppings.push(toppingDataIndex);
        isVegetarian = isVegetarian && DATA.toppings[toppingDataIndex].vegetarian;
        isVegan = isVegan && DATA.toppings[toppingDataIndex].vegan;
        isGlutenFree = isGlutenFree && DATA.toppings[toppingDataIndex].glutenFree;
        
        if (!isVegetarian) {
          vegetarianOption = vegetarianOption && (DATA.toppings[toppingDataIndex].vegetarian || DATA.toppings[toppingDataIndex].vegetarianAlternative > 0);
        }
        if (!isVegan) {
          veganOption = veganOption && (DATA.toppings[toppingDataIndex].vegan || DATA.toppings[toppingDataIndex].veganAlternative) > 0;
        }
        if (!isGlutenFree) {
          glutenFreeOption = glutenFreeOption && (DATA.toppings[toppingDataIndex].glutenFree || DATA.toppings[toppingDataIndex].glutenFreeAlternative > 0);
        }
        toppingNames += toppingIndex > 0 ? ', ' + DATA.toppings[toppingDataIndex].name.toLowerCase() : DATA.toppings[toppingDataIndex].name;
      }

      if (isVegetarian && !DATA.crust[crustDataIndex].vegetarian || !DATA.base[baseDataIndex].vegetarian) {
        isVegetarian = false;
      }

      if (isVegan && !DATA.crust[crustDataIndex].vegan) {
        isVegan = false;
      }

      if (isGlutenFree && !DATA.crust[crustDataIndex].glutenFree || !DATA.base[baseDataIndex].glutenFree) {
        isGlutenFree = false;
      }

      if (isVegetarian) {
        vegetarianOption = false;
      } else if (vegetarianOption && !DATA.base[baseDataIndex].vegetarian && !DATA.base[baseDataIndex].vegetarianAlternative) {
        vegetarianOption = false;
      };

      if (isVegan) {
        veganOption = false;
      } else if (veganOption && !DATA.base[baseDataIndex].vegan && !DATA.base[baseDataIndex].veganAlternative) {
        veganOption = false;
      };

      if (isGlutenFree) {
        glutenFreeOption = false;
      } else if (glutenFreeOption && !DATA.base[baseDataIndex].glutenFree && !DATA.base[baseDataIndex].glutenFreeAlternative) {
        glutenFreeOption = false;
      }

      pizzaVariants.push({
        id: pizzaIndex,
        variant: 0,
        name: DATA.classicPizzas[pizzaIndex].name,
        image: DATA.classicPizzas[pizzaIndex].image,
        toppingNames: toppingNames,
        toppings: toppings,
        crust: crustDataIndex,
        base: baseDataIndex,
        isVegetarian: isVegetarian,
        isVegan: isVegan,
        isGlutenFree: isGlutenFree,
        vegetarianOption: vegetarianOption,
        veganOption: veganOption,
        glutenFreeOption: glutenFreeOption
      });
      
      //Create Vegetarian variant
      if (!isVegetarian && vegetarianOption) {
        let toppingNames = '';
        let toppings = [];
        for (let toppingIndex in DATA.classicPizzas[pizzaIndex].toppings) {
          const toppingDataIndex = toppingIdToIndex(DATA.classicPizzas[pizzaIndex].toppings[toppingIndex]);
          if (DATA.toppings[toppingDataIndex].vegetarian) {
            toppings.push(toppingDataIndex);
            toppingNames += toppingIndex > 0 ? ', ' + DATA.toppings[toppingDataIndex].name.toLowerCase() : DATA.toppings[toppingDataIndex].name;
          } else {
            const vegToppingDataIndex = toppingIdToIndex(DATA.toppings[toppingDataIndex].vegetarianAlternative);
            toppings.push(vegToppingDataIndex);
            toppingNames += toppingIndex > 0 ? ', ' + DATA.toppings[vegToppingDataIndex].name.toLowerCase() : DATA.toppings[vegToppingDataIndex].name;
          }
        }
        let altBaseDataIndex = baseDataIndex;
        if (!DATA.base[altBaseDataIndex].vegetarian) {
          altBaseDataIndex = DATA.base[altBaseDataIndex].vegetarianAlternative
        }
        if (isGlutenFree) {
          if (!DATA.base[altBaseDataIndex].glutenFree) {
            isGlutenFree = false;
          }
        }
        if (!isGlutenFree) {
          if (glutenFreeOption && !DATA.base[altBaseDataIndex].glutenFree && !DATA.base[altBaseDataIndex].glutenFreeAlternative) {
            glutenFreeOption = false;
          }
        } else {
          glutenFreeOption = false;
        }
        pizzaVariants.push({
          id: pizzaIndex,
          variant: pizzaVariants.length,
          name: "Vegetarian " + DATA.classicPizzas[pizzaIndex].name,
          image: DATA.classicPizzas[pizzaIndex].image,
          toppingNames: toppingNames,
          toppings: toppings,
          crust: crustDataIndex,
          base: altBaseDataIndex,
          isVegetarian: true,
          isVegan: isVegan,
          isGlutenFree: isGlutenFree,
          vegetarianOption: false,
          veganOption: veganOption,
          glutenFreeOption: glutenFreeOption
        });
      }
      //Create Vegan variant
      if (!isVegan && veganOption) {
        let toppingNames = '';
        let toppings = [];
        for (let toppingIndex in DATA.classicPizzas[pizzaIndex].toppings) {
          const toppingDataIndex = toppingIdToIndex(DATA.classicPizzas[pizzaIndex].toppings[toppingIndex]);
          if (DATA.toppings[toppingDataIndex].vegan) {
            toppings.push(toppingDataIndex);
            toppingNames += toppingIndex > 0 ? ', ' + DATA.toppings[toppingDataIndex].name.toLowerCase() : DATA.toppings[toppingDataIndex].name;
          } else {
            const veganToppingDataIndex = toppingIdToIndex(DATA.toppings[toppingDataIndex].veganAlternative);
            toppings.push(veganToppingDataIndex);
            toppingNames += toppingIndex > 0 ? ', ' + DATA.toppings[veganToppingDataIndex].name.toLowerCase() : DATA.toppings[veganToppingDataIndex].name;
          }
        }
        let altBaseDataIndex = baseDataIndex;
        if (!DATA.base[altBaseDataIndex].vegan) {
          altBaseDataIndex = DATA.base[altBaseDataIndex].veganAlternative
        }
        if (isGlutenFree) {
          if (!DATA.base[altBaseDataIndex].glutenFree) {
            isGlutenFree = false;
          }
        }
        if (!isGlutenFree) {
          if (glutenFreeOption && !DATA.base[altBaseDataIndex].glutenFree && !DATA.base[altBaseDataIndex].glutenFreeAlternative) {
            glutenFreeOption = false;
          }
        } else {
          glutenFreeOption = false;
        }
        pizzaVariants.push({
          id: pizzaIndex,
          variant: pizzaVariants.length,
          name: "Plant-based " + DATA.classicPizzas[pizzaIndex].name,
          image: DATA.classicPizzas[pizzaIndex].image,
          toppingNames: toppingNames,
          toppings: toppings,
          crust: crustDataIndex,
          base: altBaseDataIndex,
          isVegetarian: true,
          isVegan: true,
          isGlutenFree: isGlutenFree,
          vegetarianOption: false,
          veganOption: false,
          glutenFreeOption: glutenFreeOption
        });
      }
      pizzaItems.push(<Pizza data={pizzaVariants} key={pizzaIndex} selectHandler={pizzaOnPressHandler} selected={selectedPizza.pizza === pizzaIndex} addHandler={addPizzaPressHandler} />)
    }
    return pizzaItems;
  }
  return (
    <ScrollView style={styles.screen}>
      <DietaryLegend filter={[]} inactive={true} show={true}/>
      {pizzaElements()}
    </ScrollView>
  )
}