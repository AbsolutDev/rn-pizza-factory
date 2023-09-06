import { ScrollView, View, Text, Pressable, Alert } from 'react-native';
import { DietaryIcon } from './DietaryIcon';
import { PepperIcon } from './PepperIcon';
import { ChangeQuantity } from './ChangeQuantity';
import { styles } from '../assets/styles';

export const ProductSummary = (props) => {
  const priceDiff = (props.isEdit && props.isChanged) && (props.price - props.prevPrice).toFixed(2)
  const vowels = ['a','e','i','o','u'];
  let leftToppings = props.toppings[0].length + props.toppings[1].length;
  let rightToppings = props.toppings[2].length;
  if (props.toppings[0][0] === null || props.toppings[0][1] === null) {
    leftToppings--;
  }
  const toppings = props.isHalfHalf ? leftToppings + rightToppings: leftToppings;
  let dietary = props.isVegan ? 'plant-based' : props.isVegetarian ? 'vegetarian' : 'meat-based';
  dietary += props.isGlutenFree ? ', gluten free' : '';

  const productIcons = () => {
    const icons = [];
    props.isVegetarian && icons.push(<DietaryIcon type='vg' key={icons.length+1} />);
    props.isVegan && icons.push(<DietaryIcon type='pb' key={icons.length+1} />);
    props.isGlutenFree && icons.push(<DietaryIcon type='gf' key={icons.length+1} />);
    for (let i=0;i<props.isSpicy;i++) {
      icons.push(<PepperIcon key={icons.length+1} />)
    }
    return icons;
  }
  
  const submitOnPressHandler = () => {
    if (!props.isEdit) {
      //Product is new
      props.handler()
    } else if (!props.isChanged) {
      //Product is existing but no changes done
      props.handler(true);
    } else {
      //Product is existing and has changes
      Alert.alert('', `Update existing product in the cart or add as new?`,[
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Update existing',
          onPress: () => {
            props.handler();}
        },
        {
          text: 'Add as new',
          onPress: () => {
            props.handler(false, true);}
        },
      ],{
        cancelable: true
      })
    }
  }

  return (
    <ScrollView>
      <View style={styles.productSummaryDescriptionContainer}>
        {!props.isEdit && 
          <Text style={[styles.productSummaryText]}>Your <Text style={styles.productSummaryTextHighlighted}>{props.size.toLowerCase()}</Text> pizza with {props.crust && vowels.indexOf(props.crust.charAt(0).toLowerCase()) >= 0 ? 'an ' : 'a '}<Text style={styles.productSummaryTextHighlighted}>{props.crust.toLowerCase()}</Text> <Text style={styles.productSummaryTextHighlighted}>{props.base !== '' && props.base.toLowerCase() + ' '}</Text>crust and <Text style={styles.productSummaryTextHighlighted}>{toppings} topping{toppings > 1 && 's'}</Text> is ready to be ordered.</Text>
        }
        <View style={styles.productSummaryInfoContainer}>
          <Text style={[styles.productSummaryCalories]}>
            ~{props.calories}kcal ({props.servings} serving{props.servings>1 && 's'})
          </Text>
          <View style={styles.productSummaryIconsContainer}>
            {productIcons()}
          </View>
        </View>
      </View>

      <View style={[styles.productSummaryBottomContainer]}>
        { !props.isEdit &&
          <ChangeQuantity qty={props.quantity} handler={props.setQuantity} minQty={1} maxQty={props.maxQuantity} />
        }
        <Pressable onPress={submitOnPressHandler} style={styles.productSummaryAddButtonWrapper}>
          { !props.isEdit &&
            <View style={styles.productSummaryAddButtonContainer}>
              <Text style={[styles.productSummaryAddButtonLeft]}>Add to cart</Text>
              <Text style={[styles.productSummaryAddButtonRight]}>£{(props.price * props.quantity).toFixed(2)}</Text>
            </View>
          }
          { (props.isEdit && !props.isChanged) &&
            <View style={[styles.productSummaryAddButtonContainer, styles.productSummaryAddButtonContainerUpdate]}>
              <Text style={[styles.productSummaryAddButtonLeft, styles.productSummaryAddButtonNoChanges]}>Return (no changes)</Text>
            </View>
          }
          { (props.isEdit && props.isChanged && Number(priceDiff) === 0) &&
            <View style={[styles.productSummaryAddButtonContainer, styles.productSummaryAddButtonContainerUpdate]}>
              <Text style={[styles.productSummaryAddButtonLeft, styles.productSummaryAddButtonNoCharge]}>Update cart</Text>
            </View>
          }
          { (props.isEdit && props.isChanged && Number(priceDiff) !== 0) &&
            <View style={[styles.productSummaryAddButtonContainer, styles.productSummaryAddButtonContainerUpdate]}>
              <Text style={[styles.productSummaryAddButtonLeft, styles.productSummaryAddButtonLeftUpdate]}>Update cart</Text>
              { Number(priceDiff) > 0 && <Text style={[styles.productSummaryAddButtonRight, styles.productSummaryAddButtonRightUpdate, styles.productSummaryAddButtonRightUpdatePositive]}>{'+£' + priceDiff}</Text>}
              { Number(priceDiff) < 0 && <Text style={[styles.productSummaryAddButtonRight, styles.productSummaryAddButtonRightUpdateNegative]}>{'-£' + priceDiff}</Text>}
            </View>
          }
        </Pressable>
      </View>
    </ScrollView>
  )
}