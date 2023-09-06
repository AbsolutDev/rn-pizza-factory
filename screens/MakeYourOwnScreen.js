import { ScrollView, ToastAndroid, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChooseBase } from '../components/ChooseBase';
import { ChooseSize } from '../components/ChooseSize';
import { ChooseCrust } from '../components/ChooseCrust';
import { ChooseToppings } from '../components/ChooseToppings';
import { SectionStepTitle } from '../components/SectionStepTitle';
import { ProductSummary } from '../components/ProductSummary';
import { styles } from '../assets/styles';
import { DATA } from '../assets/data.js';
import { addProductToCart } from '../features/cart';
import { setConfirmExit } from '../features/status';
import { selectConfirmExit } from '../features/status';
import { ThemeProvider } from '@react-navigation/native';


export const MakeYourOwnScreen = (props) => {
  //console.log(props.route.params ? props.route.params : '')
  const dispatch = useDispatch();
  const confirmExit = useSelector(selectConfirmExit);
  const inputData = props.route.params ? props.route.params.data : null;
  
  const [productState, setProductState] = useState({
    currentStage: 0,
    completedStage: 0,
    productPrice: 0,
    productCalories: 0,
    isVegetarian: null,
    isVegan: null,
    isGlutenFree: null,
    isSpicy: null,
    allowHalfHalf: false,
    quantity: 1
  })

  const [productBase, setProductBase] = useState({
    selectedBase: null,
    baseType: null,
    baseTypeCaloriesMultiplier: 1,
    baseFilter: []
  })

  const [productSize, setProductSize] = useState({
    selectedSize: null,
    sizeTypeToppingPriceMultiplier: 1,
    sizeTypeCaloriesMultiplier: 1,
    crustPriceMultiplier: 1
  })

  const [productCrust, setProductCrust] = useState({
    selectedCrust: null,
    crustTypeCaloriesMultiplier: 1
  })

  const [productToppings, setProductToppings] = useState({
    selectedToppings: {
      0: [null, null],    //[0] always stores base cheese/null, [1] always stores base sauce/null
      1: [],
      2: []
    },
    selectedToppingsPrice: [0,0,0],
    isHalfHalf: false,
    toppingsFilter: [],
    toppingsTotalCalories: [0,0,0],
    toppingPrices:[],
    isVegetarian: null,
    isVegan: null,
    isGlutenFree: null,
    autoProcess: true
  })

  useEffect(() => {
    props.navigation.setOptions({title: inputData ? props.route.params.title : 'Make Your Own Pizza'})
    setStage(1);
  },[])

  useEffect(() => {
    console.log(`Stage changed to ${productState.currentStage}`)
    switch (productState.currentStage) {
      case 1:
        //Set the Base Type
        if (inputData && productBase.selectedBase === null && inputData.base >= 0) {
          setBase(inputData.makeGlutenFree ? DATA.base[inputData.base].glutenFreeAlternative : inputData.base);
          if (productCrust.selectedCrust === null && inputData.crust >= 0) {
            setCrust(inputData.crust);
          }
        }
        break;
      case 2:
        //Set the Size
        if (inputData && productSize.selectedSize === null && inputData.size >= 0) {
          setSize(inputData.size);
        }
        break;
      case 3:
        //Set the Crust
        if (inputData && productState.completedStage < 3 && productCrust.selectedCrust !== null) {
          setProductState({
            ...productState,
            currentStage: 4,
            completedStage: 3
          })
        }
        break;
      case 4:
        //Set the Toppings
        if(!productToppings.toppingsTotalCalories[0]) {
          const toppingCalories = [0,0,0];
          for (let sectionIndex in productToppings.selectedToppings) {
            productToppings.selectedToppings[sectionIndex].forEach((item) => {
              toppingCalories[sectionIndex] += item !== null ? DATA.toppings[item].calories : 0;
            })
          }
          setProductToppings({
            ...productToppings,
            toppingsTotalCalories: [...toppingCalories],
          })
        }
        if (inputData && props.route.params.action === 'edit') {
          setQuantity(inputData.quantity);
        }
        break;
      case 5:
        scrollView.scrollToEnd();
        //Calculate total price
        const price =
          DATA.sizes[productSize.selectedSize].price +
          (DATA.crust[productCrust.selectedCrust].price * productSize.crustPriceMultiplier) +
          productToppings.selectedToppingsPrice[0] +
          productToppings.selectedToppingsPrice[1] +
          (productToppings.isHalfHalf && productToppings.selectedToppingsPrice[2])
        //Calculate total calories
        const calories = 
          Math.ceil(
            //Base calories:
            (DATA.baseSizeData.calories *
            productBase.baseTypeCaloriesMultiplier *
            productCrust.crustTypeCaloriesMultiplier *
            productSize.sizeTypeCaloriesMultiplier
            ) +
            //Base toppings calories
            (
            productToppings.toppingsTotalCalories[0] *
            productSize.sizeTypeCaloriesMultiplier
            ) +
            //Non-base toppings calories
            (
            productToppings.toppingsTotalCalories[1] +
            productToppings.toppingsTotalCalories[2]
            ) * productSize.sizeTypeCaloriesMultiplier / (productState.isHalfHalf ? 2 : 1)
          )
        //Calculate product dietary
        const isVegetarian = productToppings.isVegetarian && DATA.base[productBase.selectedBase].vegetarian && DATA.crust[productCrust.selectedCrust].vegetarian
        const isVegan = productToppings.isVegan && DATA.base[productBase.selectedBase].vegan && DATA.crust[productCrust.selectedCrust].vegan
        const isGlutenFree = productToppings.isGlutenFree && DATA.base[productBase.selectedBase].glutenFree && DATA.crust[productCrust.selectedCrust].glutenFree
        //Calculate spicyness
        let spicyLevel = 0;
        for (let section in productToppings.selectedToppings) {
          for (let toppingIndex in productToppings.selectedToppings[section]) {
            if (productToppings.selectedToppings[section][toppingIndex] !== null) {
              spicyLevel=Math.max(spicyLevel, DATA.toppings[productToppings.selectedToppings[section][toppingIndex]].spicy)
            }
          }
          
        }
        setProductState({
          ...productState,
          productPrice: price,
          productCalories: calories,
          isVegetarian: isVegetarian,
          isVegan: isVegan,
          isGlutenFree: isGlutenFree,
          isSpicy: spicyLevel
        })
        break;
      default:
        
    }
  }, [productState.currentStage])

  useEffect(() => {
    getToppingsDietary();
  }, [productToppings.selectedToppings])

  useEffect(() => {
    if (productBase.selectedBase !== null) {
      setAutoToppings();
    }
  },[productBase.selectedBase])


  useEffect(() => {
    if (productBase.selectedBase !== null && productToppings.autoProcess === false) {
      productToppings.selectedToppings;
      setProductState({
        ...productState,
        currentStage:  productState.completedStage === 0 ? 2 : (productCrust.selectedCrust === null && productState.completedStage >= 3 ? 3 : (productState.completedStage + 1)),
        completedStage: productState.completedStage === 0 ? 1 : productState.completedStage,
      })
      setProductToppings({
        ...productToppings,
        autoProcess: true
      })
    }
  }, [productToppings.autoProcess])
  

  useEffect(
    () => 
      props.navigation.addListener('beforeRemove', (e) => {
        if (e.data.action.type === 'NAVIGATE' || !confirmExit) {
          return;
        }
        e.preventDefault();
        Alert.alert('', `Discard and exit?`,[
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Discard',
            
            onPress: () => {
              dispatch(setConfirmExit(false));
              props.navigation.dispatch(e.data.action)}
          }
        ],{
          cancelable: true
        })
      }),
      [props.navigation, confirmExit]
  )

  useEffect(() => {
    if (productState.currentStage > 0) {
      setToppingPrices(productSize.sizeTypeToppingPriceMultiplier, productToppings.isHalfHalf);
    }
  }, [productToppings.isHalfHalf])

  const showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  }

  const setBase = (baseIndex, auto = true) => {
    if (baseIndex !== productBase.selectedBase) {
      (!auto && !confirmExit) && dispatch(setConfirmExit(true));

      const filter = [...productBase.baseFilter];
      let crust = productCrust.selectedCrust;
      let nextStage = 2;
      const baseType = DATA.base[baseIndex].vegan ? 'pb' : DATA.base[baseIndex].glutenFree ? 'gf' : '';
      if (productState.completedStage === 0) {
        if (!filter.length) {
          DATA.base[baseIndex].vegan && filter.push('pb');
          DATA.base[baseIndex].glutenFree && filter.push('gf');
        }
      }
      if (crust !== null && ((DATA.base[baseIndex].vegan && !DATA.crust[crust].vegan) || (DATA.base[baseIndex].vegetarian && !DATA.crust[crust].vegetarian) || (DATA.base[baseIndex].glutenFree && !DATA.crust[crust].glutenFree))) {
        //Selected base type is not compatible with selected crust. Reset crust
        showToast(`${DATA.crust[crust].name} crust not compatible with ${DATA.base[productBase.selectedBase].name.toLowerCase()} base. Choose other crust`);
        crust = null;
        nextStage = 3;
      }
      //Reset the crust
      crust !== productCrust.selectedCrust && setProductCrust({
        ...productCrust,
        selectedCrust: crust,
      })

      //Set the selected base
      setProductBase({
        ...productBase,
        selectedBase: baseIndex,        
        baseType: baseType,
        baseTypeCaloriesMultiplier: DATA.base[baseIndex].caloriesMultiplier,
        baseFilter: [...filter],
      })
    }
  }

  const setSize = (sizeIndex, auto = true) => {
    const allowHalfHalf = (sizeIndex >= DATA.baseSizeData.minBaseSizeForHalfHalf);
    let isHalfHalf = productToppings.isHalfHalf;
    if (!allowHalfHalf && productToppings.isHalfHalf) {
      setProductToppings({
        ...productToppings,
        isHalfHalf: false
      })
      isHalfHalf = false;
    }
    if (sizeIndex !== productSize.selectedSize) {
      (!auto && !confirmExit) && dispatch(setConfirmExit(true));
      setToppingPrices(DATA.sizes[sizeIndex].toppingsMultiplier, isHalfHalf);
      setProductSize({
        selectedSize: sizeIndex,
        sizeTypeToppingPriceMultiplier: DATA.sizes[sizeIndex].toppingsMultiplier,
        sizeTypeCaloriesMultiplier: DATA.sizes[sizeIndex].caloriesMultiplier,
        crustPriceMultiplier: DATA.sizes[sizeIndex].crustPriceMultiplier
      })
      setProductState({
        ...productState,
        currentStage: productState.completedStage === 1 ? 3 : (productState.completedStage + 1),
        completedStage: productState.completedStage === 1 ? 2  : productState.completedStage,
        allowHalfHalf: allowHalfHalf,
      })
    }
  }

  const setCrust = (crustIndex, auto = true) => {
    if (crustIndex !== productCrust.selectedCrust) {
      (!auto && !confirmExit) && dispatch(setConfirmExit(true));
      
      let toppingsFilter = [];
      if (productState.completedStage === 2 && productBase.baseFilter.length) {
        toppingsFilter = [...productBase.baseFilter];
        showToast(`Toppings have been automatically filtered to match your base selection`);
      }
      setProductCrust({
        ...productCrust,
        selectedCrust: crustIndex,
        crustTypeCaloriesMultiplier: DATA.crust[crustIndex].caloriesMultiplier
      })
      setProductToppings({
        ...productToppings,
        toppingsFilter: [...toppingsFilter]
      })
      productState.currentStage === 3 && 
        setProductState({
          ...productState,
          currentStage: productState.completedStage === 2 ? 4 : (productState.completedStage + 1),
          completedStage: productState.completedStage === 2 ? 3 : productState.completedStage,
        })
    }
  }

  const setToppingPrices = (sizeTypeToppingPriceMultiplier = productSize.sizeTypeToppingPriceMultiplier, isHalfHalf = productToppings.isHalfHalf) => {
    const toppingPrices = [];
    const selectedToppingsPrice = [0,0,0]
    for (let topping of DATA.toppings) {
      toppingPrices.push(Number((topping.price * sizeTypeToppingPriceMultiplier / ((!topping.isBase && isHalfHalf) ? 2 : 1)).toFixed(2)))
    }
    for (let section in productToppings.selectedToppings) {
      for (let toppingIndex in productToppings.selectedToppings[section]) {
        if (!(Number(section) === 0 && toppingIndex < 2)) {
          selectedToppingsPrice[section] += toppingPrices[productToppings.selectedToppings[section][toppingIndex]]
        }
      }
    }
    setProductToppings({
      ...productToppings,
      toppingPrices: [...toppingPrices],
      selectedToppingsPrice: [...selectedToppingsPrice]
    })
  }

  const toppingIdToIndex = (id) => {
    for (let toppingIndex in DATA.toppings) {
      if (DATA.toppings[toppingIndex].id === id) {
        return toppingIndex;
      }
    }
  };

  const setAutoToppings = () => {
    //Get base toppings
    let baseCheese = 0;
    let baseCheeseAlt = [];
    let pbCheese = 0;
    let pbCheeseAlt = [];
    let baseSauce = 0;
    let makeHalfHalf = productToppings.isHalfHalf;

    for (let toppingIndex in DATA.toppings) {
      if (DATA.toppings[toppingIndex].baseCheese === 1) {
        baseCheese = Number(toppingIndex);
        continue;
      }
      if (DATA.toppings[toppingIndex].baseCheese === 2) {
        baseCheeseAlt.push(Number(toppingIndex));
        continue;
      }
      if (DATA.toppings[toppingIndex].pbCheese === 1) {
        pbCheese = Number(toppingIndex);
        continue;
      }
      if (DATA.toppings[toppingIndex].pbCheese === 2) {
        pbCheeseAlt.push(Number(toppingIndex));
        continue;
      }
      if (DATA.toppings[toppingIndex].baseSauce === 1) {
        baseSauce = Number(toppingIndex);
        continue;
      }
    }
    const isPlantBased = (productBase.baseType === 'pb');
    const isGlutenFree = (productBase.baseType === 'gf');
    let baseToppings = [];
    let pizzaToppings = [[],[]];

    if (!productToppings.selectedToppings[0][0] && !productToppings.selectedToppings[0][1]) {
      //No base toppings selected at the moment; first time base selection
      //Sets base toppings to either Standard Cheese or Plant Based Cheese and tomato sauce
      if (inputData) {
        //Add pre-selected toppings
        baseToppings = [...inputData.toppings[0]];
        pizzaToppings[0] = [...inputData.toppings[1]];
        if (props.route.params.action === 'edit') {
          makeHalfHalf = inputData.isHalfHalf
        };
        if (makeHalfHalf) { pizzaToppings[1] = [...inputData.toppings[2]]};
      } else {
        //Add default toppings
        baseToppings = [(isPlantBased ? pbCheese : baseCheese), baseSauce];
      }
    } else {
      //This is a base change; toppings need to be replaced as per base type
      let toppingsRemoved = false;
      for (let toppingsSection in productToppings.selectedToppings) {
        if (Number(toppingsSection) === 0) {
          baseToppings = productToppings.selectedToppings[Number(toppingsSection)].map(val => {
            if (isPlantBased) {
              if (val === baseCheese || baseCheeseAlt.indexOf(val) >= 0) {
                return pbCheese;
              } else {
                return val;
              }
            } else {
              if (val === pbCheese || pbCheeseAlt.indexOf(val) >= 0) {
                return baseCheese;
              } else {
                return val;
              }
            }
          })
        } else {
          productToppings.selectedToppings[toppingsSection].forEach(val => {
            if (isPlantBased) {
              if (DATA.toppings[val].vegan) {
                pizzaToppings[toppingsSection-1].push(val);
              } else if (DATA.toppings[val].veganAlternative) {
                pizzaToppings[toppingsSection-1].push(Number(toppingIdToIndex(DATA.toppings[val].veganAlternative)));
              } else {
                toppingsRemoved = true;
              }
            } else if (isGlutenFree) {
              if (DATA.toppings[val].glutenFree) {
                pizzaToppings[toppingsSection-1].push(val);
              } else if (DATA.toppings[val].glutenFreeAlternative) {
                pizzaToppings[toppingsSection-1].push(Number(toppingIdToIndex(DATA.toppings[val].glutenFreeAlternative)));
              } else {
                toppingsRemoved = true;
              }
            } else {
              if (DATA.toppings[val].alternativeFor) {
                pizzaToppings[toppingsSection-1].push(Number(toppingIdToIndex(DATA.toppings[val].alternativeFor)));
              } else {
                pizzaToppings[toppingsSection-1].push(val);
              }
            }
          })
        }
      }
      toppingsRemoved && showToast('Some of the selected toppings have been removed')
    }
    //Recalculate topping calories
    const toppingCalories = [0,0,0];
    baseToppings.forEach((item) => {
      toppingCalories[0] += DATA.toppings[item].calories;
    })
    
    pizzaToppings[0].forEach(item => {
      toppingCalories[1] += DATA.toppings[item].calories
    })
    pizzaToppings[1].forEach(item => {
      toppingCalories[2] += DATA.toppings[item].calories
    })
    setProductToppings({
      ...productToppings,
      toppingsTotalCalories: [...toppingCalories],
      isHalfHalf: makeHalfHalf,
      autoProcess: false,
      selectedToppings: {
        ...productToppings.selectedToppings,
        0: [...baseToppings],
        1: [...pizzaToppings[0]],
        2: [...pizzaToppings[1]]
      }
    })
  }

  const setToppings = (toppingIndex, action, section) => {
    const selectedToppings = {...productToppings.selectedToppings};
    const toppingsCalories = [...productToppings.toppingsTotalCalories];
    const selectedToppingsPrice = {...productToppings.selectedToppingsPrice};
    switch(action) {
      case "add":
        console.log(`${action} ${toppingIndex} to ${section}`)
        if (section === 0) {
          if (selectedToppings[0][0] === null && DATA.toppings[toppingIndex].isBase === 1) {
            //Set the topping as base cheese topping (no charge)
            selectedToppings[0][0] = toppingIndex;
          } else if (selectedToppings[0][1] === null && DATA.toppings[toppingIndex].isBase === 2) {
            //Set the topping as base sauce topping (no charge)
            selectedToppings[0][1] = toppingIndex;
          } else {
            //The topping is an extra base topping
            selectedToppings[0].push(toppingIndex);
            selectedToppingsPrice[0] += productToppings.toppingPrices[toppingIndex]
          }
        } else {
          //The topping is not a base topping
          selectedToppings[section].push(toppingIndex);
          selectedToppingsPrice[section] += productToppings.toppingPrices[toppingIndex]
        }
        toppingsCalories[section] += DATA.toppings[toppingIndex].calories;
        break;
      case "remove":
        console.log(`${action} ${toppingIndex} from ${section}`)
        selectedToppings[section] = [];
        if (section === 0) {
          if (productToppings.selectedToppings[0][0] === toppingIndex) {
            //Remove base cheese topping
            selectedToppings[0].push(null);
            selectedToppings[0].push(productToppings.selectedToppings[0][1]);
            toppingsCalories[0] -= DATA.toppings[toppingIndex].calories;
          } else if (productToppings.selectedToppings[0][1] === toppingIndex) {
            //Remove base sauce topping
            selectedToppings[0].push(productToppings.selectedToppings[0][0]);
            selectedToppings[0].push(null);
            toppingsCalories[0] -= DATA.toppings[toppingIndex].calories;
          }
          productToppings.selectedToppings[0].forEach((item, index) => {
            if (index > 1) {
              //Push all other extra base toppings
              if (item !== toppingIndex) {
                selectedToppings[0].push(item)
              } else {
                //Take out calories and price if topping is extra base
                toppingsCalories[0] -= DATA.toppings[toppingIndex].calories;
                selectedToppingsPrice[0] -= productToppings.toppingPrices[toppingIndex]
              }
            }
          })
        } else {
          productToppings.selectedToppings[section].forEach(item => {
            if (item !== toppingIndex) {
              //Push all other extra toppings
              selectedToppings[section].push(item)
            } else {
              //Take out calories and price if topping is extra
              toppingsCalories[section] -= DATA.toppings[toppingIndex].calories;
              selectedToppingsPrice[section] -= productToppings.toppingPrices[toppingIndex]
            }
          })
        }
        break;
      case "replace":
        console.log(`${action} ${toppingIndex[0]} with ${toppingIndex[1]} in ${section}`)
        selectedToppings[section] = [];
        if (section === 0) {
          if (productToppings.selectedToppings[0][0] === toppingIndex[0]) {
            //Replace base cheese topping (no charge)
            selectedToppings[0].push(toppingIndex[1]);
            selectedToppings[0].push(productToppings.selectedToppings[0][1])
            //Update topping calories accordingly
            toppingsCalories[0] -= DATA.toppings[toppingIndex[0]].calories;
            toppingsCalories[0] += DATA.toppings[toppingIndex[1]].calories;
          } else if (productToppings.selectedToppings[0][1] === toppingIndex[0]) {
            //Replace base sauce topping (no charge)
            selectedToppings[0].push(productToppings.selectedToppings[0][0])
            selectedToppings[0].push(toppingIndex[1]);
            //Update topping calories accordingly
            toppingsCalories[0] -= DATA.toppings[toppingIndex[0]].calories;
            toppingsCalories[0] += DATA.toppings[toppingIndex[1]].calories;
          }
          productToppings.selectedToppings[0].forEach((item, index) => {
            if (index > 1) {
              if (item !== toppingIndex[0]) {
                //Re-add other extra base toppings
                selectedToppings[0].push(item)
              } else {
                //Take out calories and price if topping is extra base
                toppingsCalories[0] -= DATA.toppings[toppingIndex[0]].calories;
                selectedToppingsPrice[0] -= productToppings.toppingPrices[toppingIndex[0]]
              }
            }
          })
        } else {
          productToppings.selectedToppings[section].forEach(item => {
            if (item !== toppingIndex[0]) {
              //Push all other extra toppings
              selectedToppings[section].push(item)
            } else {
              //Take out calories and price if topping is extra
              toppingsCalories[section] -= DATA.toppings[toppingIndex[0]].calories;
              selectedToppingsPrice[section] -= productToppings.toppingPrices[toppingIndex[0]]
            }
          })
          //Add the new topping and update calories and price
          selectedToppings[section].push(toppingIndex[1]);
          toppingsCalories[section] += DATA.toppings[toppingIndex[1]].calories;
          selectedToppingsPrice[section] += productToppings.toppingPrices[toppingIndex[1]]
        } 
    }
    setProductToppings({
      ...productToppings,
      selectedToppings: {...selectedToppings},
      toppingsTotalCalories: [...toppingsCalories],
      selectedToppingsPrice: {...selectedToppingsPrice}
    })
    !confirmExit && dispatch(setConfirmExit(true));
  }

  const getToppingsDietary = () => {
    let isVegetarian = true;
    let isPlantBased = true;
    let isGlutenFree = true;
    for (let section in productToppings.selectedToppings) {
      for (let toppingIndex of productToppings.selectedToppings[section]) {
        if (toppingIndex !== null) {
          if (isVegetarian) {
            isVegetarian = DATA.toppings[toppingIndex].vegetarian
          }
          if (isPlantBased) {
            isPlantBased = DATA.toppings[toppingIndex].vegan
          }
          if (isGlutenFree) {
            isGlutenFree = DATA.toppings[toppingIndex].glutenFree
          }
        }
      }
    }
    setProductToppings({
      ...productToppings,
      isVegetarian: isVegetarian,
      isVegan: isPlantBased,
      isGlutenFree: isGlutenFree
    })
  }

  const setBaseFilter = (filter) => {
    if(productBase.baseFilter.indexOf(filter) < 0) {
      setProductBase({
        ...productBase,
        baseFilter: [...productBase.baseFilter, filter]
      })
    } else {
      setProductBase({
        ...productBase,
        baseFilter: productBase.baseFilter.filter(item => item !== filter)
      })
    }
  }

  const setToppingsFilter = (filter) => {
    if(productToppings.toppingsFilter.indexOf(filter) < 0) {
      //Add filter
      if ((filter === 'vg' && !productToppings.isVegetarian) || (filter === 'pb' && !productToppings.isVegan) || (filter === 'gf' && !productToppings.isGlutenFree)) {
        showToast("Some of the selected toppings cannot be filtered out")
      }
      setProductToppings({
        ...productToppings,
        toppingsFilter: [...productToppings.toppingsFilter, filter]
      })
    } else {
      //Remove filter
      setProductToppings({
        ...productToppings,
        toppingsFilter: productToppings.toppingsFilter.filter(item => item !== filter)
      })
    }
  }

  const setHalfHalf = () => {
    !confirmExit && dispatch(setConfirmExit(true));
    setProductToppings({
      ...productToppings,
      isHalfHalf: !productToppings.isHalfHalf,
      selectedToppings: {
        0: [...productToppings.selectedToppings[0]],
        1: [...productToppings.selectedToppings[1]],
        2: [],
      },
      toppingsTotalCalories: [productToppings.toppingsTotalCalories[0],productToppings.toppingsTotalCalories[1],0]

    })
  }

  const completeToppingsStage = () => {    
    setProductState({
      ...productState,
      currentStage: productState.completedStage === 3 ? 5 : (productState.completedStage + 1),
      completedStage: productState.completedStage === 3 ? 4 : productState.completedStage
    })
  }

  const setQuantity = (qty) => {
    setProductState({
      ...productState,
      quantity: qty
    })
  }

  const setStage = (stage) => {
    stage <= (productState.completedStage + 1)  &&
    setProductState({
      ...productState,
      currentStage: stage
    })
  }

  const sectionStepTitlePressHandler = (stage) => {
    if (productState.completedStage >= stage) {
      setStage(productState.currentStage === stage ? productState.completedStage + 1 : stage);
    } else {
      switch(productState.completedStage) {
        case 0:
          showToast("You need to pick a base first.");
          break;
        case 1:
          showToast("You need to select a size");
          productState.currentStage < 2 && setStage(2);
          break;
        case 2:
          showToast("You need to select a crust type");
          productState.currentStage < 3 && setStage(3);
          break;
      }
    }
  }

  const submitHandler = (noChanges = false, addNew = false) => {
    if (noChanges) {
      props.navigation.goBack();
    } else {
      dispatch(addProductToCart({
        base: productBase.selectedBase,
        calories: productState.productCalories,
        crust: productCrust.selectedCrust,
        id: (inputData && !addNew) && inputData.id,
        image: inputData ? inputData.image : require('../assets/pizzas/custom.png'),
        isGlutenFree: productState.isGlutenFree,
        isHalfHalf: productToppings.isHalfHalf,
        isSpicy: productState.isSpicy,
        isVegan: productState.isVegan,
        isVegetarian: productState.isVegetarian,
        maxQuantity: DATA.appSettings.maxPizzaQuantity,
        name: inputData ? inputData.name : 'Make Your Own',
        pizzaId: inputData ? inputData.pizzaId : '',
        price: productState.productPrice,
        productCode: (inputData && !addNew) && inputData.productCode,
        productType: inputData ? inputData.productType : 'bespoke',
        quantity: addNew ? 1 : productState.quantity,
        size: productSize.selectedSize,
        toppings: {...productToppings.selectedToppings},
      }));
      showToast("Your cart has been updated");
      dispatch(setConfirmExit(false));
      props.navigation.navigate('Main');
    }
  }

  //console.log(product);
  return (
    <ScrollView
      style={styles.screen}
      stickyHeaderIndices={[(productState.currentStage - 1) * 2]}
      ref={(scrollView) => { this.scrollView = scrollView }}
    >
      <SectionStepTitle
        sectionTitle="Step 1: Choose a Base"
        pressHandler={sectionStepTitlePressHandler}
        stage='1'
      />
      <ChooseBase
        stage='1'
        currentStage={productState.currentStage}
        completedStage={productState.completedStage}
        setStage={setStage}
        handler={setBase}
        bases={DATA.base}
        currentSelection={productBase.selectedBase}
        filter={productBase.baseFilter}
        setFilter={setBaseFilter}
      />
      <SectionStepTitle
        sectionTitle="Step 2: Select Size"
        pressHandler={sectionStepTitlePressHandler}
        stage='2'
      /> 
      <ChooseSize
        stage='2'
        currentStage={productState.currentStage}
        completedStage={productState.completedStage}
        setStage={setStage}
        handler={setSize}
        sizes={DATA.sizes}
        currentSelection={productSize.selectedSize}
        baseSize={DATA.baseSizeData}
        baseTypeCaloriesMultiplier={productBase.baseTypeCaloriesMultiplier}
      />
      <SectionStepTitle
        sectionTitle="Step 3: Select Crust"
        pressHandler={sectionStepTitlePressHandler}
        stage='3'
      /> 
      <ChooseCrust
        stage='3'
        currentStage={productState.currentStage}
        completedStage={productState.completedStage}
        setStage={setStage}
        handler={setCrust}
        crusts={DATA.crust}
        currentSelection={productCrust.selectedCrust}
        filter={productBase.baseFilter}
        baseSize={DATA.baseSizeData}
        baseTypeCaloriesMultiplier={productBase.baseTypeCaloriesMultiplier}
        sizeTypeCaloriesMultiplier={productSize.sizeTypeCaloriesMultiplier}
        crustPriceMultiplier={productSize.crustPriceMultiplier}
        baseType={productBase.baseType}
      />
      <SectionStepTitle
        sectionTitle="Step 4: Toppings"
        pressHandler={sectionStepTitlePressHandler}
        stage='4'
        buttonHandler={completeToppingsStage}
        show={productState.currentStage === 4}
        totalPrice={(productToppings.selectedToppingsPrice[0] + productToppings.selectedToppingsPrice[1] + (productToppings.isHalfHalf && productToppings.selectedToppingsPrice[2])).toFixed(2)}
        calories={productState.completedStage >= 3 && Math.ceil((productToppings.toppingsTotalCalories[0] * productSize.sizeTypeCaloriesMultiplier) + ((productToppings.toppingsTotalCalories[1] + productToppings.toppingsTotalCalories[2]) * productSize.sizeTypeCaloriesMultiplier) / (productToppings.isHalfHalf ? 2 : 1))}
      />
      <ChooseToppings
        stage='4'
        currentStage={productState.currentStage}
        completedStage={productState.completedStage}
        setStage={setStage}
        handler={setToppings}
        toppings={DATA.toppings}
        toppingsCalories={productToppings.toppingsTotalCalories}
        currentSelection={productToppings.selectedToppings}
        allowHalfHalf={productState.allowHalfHalf}
        isHalfHalf={productToppings.isHalfHalf}
        setHalfHalf={setHalfHalf}
        sizeTypeCaloriesMultiplier={productSize.sizeTypeCaloriesMultiplier}
        toppingPrices={productToppings.toppingPrices}
        filter={productToppings.toppingsFilter}
        setFilter={setToppingsFilter}
        baseSize={DATA.baseSizeData}
        maxToppings={productSize.selectedSize !== null && DATA.sizes[productSize.selectedSize].maxToppings}
      />
      {productState.currentStage === 5 && <ProductSummary
        stage='5'
        show={productState.currentStage === 5}
        size={productSize.selectedSize !== null ? DATA.sizes[productSize.selectedSize].name : ''}
        servings={productSize.selectedSize !== null ? DATA.sizes[productSize.selectedSize].serves : ''}
        crust={productCrust.selectedCrust !== null ? DATA.crust[productCrust.selectedCrust].name : ''}
        base={productBase.selectedBase ? DATA.base[productBase.selectedBase].name : ''}
        isHalfHalf={productToppings.isHalfHalf}
        toppings={productToppings.selectedToppings}
        isVegetarian={productState.isVegetarian}
        isVegan={productState.isVegan}
        isGlutenFree={productState.isGlutenFree}
        isSpicy={productState.isSpicy}
        calories={productState.productCalories}
        price={productState.productPrice}
        quantity={productState.quantity}
        maxQuantity={DATA.appSettings.maxPizzaQuantity}
        setQuantity={setQuantity}
        handler={submitHandler}
        isChanged={confirmExit}
        isEdit = {inputData && props.route.params.action === 'edit'}
        prevPrice = {(inputData && props.route.params.action === 'edit') && inputData.price}
      />}
    </ScrollView>
  )
}