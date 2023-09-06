import { useEffect } from 'react';
import { Text, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ExtraProduct } from '../components/ExtraProduct';
import { selectProductQuantity } from '../features/cart';
import { changeExtraQuantity } from '../features/cart';
import { removeExtra } from '../features/cart';
import { addExtra } from '../features/cart';
import { styles } from '../assets/styles';
import { DATA } from '../assets/data';

export const ExtrasScreen = (props) => {
  const dispatch = useDispatch();
  const inputData = props.route.params.data;
  const productCategory = props.route.params.productCategory;

  const pageTitles = {
    sides: 'Sides',
    desserts: 'Desserts',
    drinks: 'Drinks'
  }

  const productIdPrefixes = {
    sides: 'side',
    desserts: 'dess',
    drinks: 'drin'
  }

  useEffect(()=> {
    //Set the screen title
    props.navigation.setOptions({title: pageTitles[props.route.params.productCategory]})
  },[])

  const addRemoveToCart = (action, productRef, qty) => {
    switch (action) {
      case 'add':
        dispatch(addExtra(
          {...inputData[productRef], maxQuantity: DATA.appSettings.maxExtrasQuantity, productType: productCategory.slice(0,-1), productCode: (productIdPrefixes[productCategory] + (productRef + 1)), quantity: 1}))
        break;
      case 'remove':
        dispatch(removeExtra(productRef))
        break;
      case 'change':
        dispatch(changeExtraQuantity(productRef, qty))
        break;
    }
  }

  const pageElements = () => {
    const elements = [];
    for (let element of inputData) {
      const productCode = productIdPrefixes[productCategory] + (elements.length + 1);
      elements.push(<ExtraProduct key={elements.length} index={elements.length} data={element} productCode={productCode} handler={addRemoveToCart} maxQty={DATA.appSettings.maxExtrasQuantity} qty={useSelector((state) => selectProductQuantity(state, productCode))}/>)
    }
    return elements;
  }

  return (
    <ScrollView style={styles.screen}>
      {pageElements()}
    </ScrollView>
  )
}