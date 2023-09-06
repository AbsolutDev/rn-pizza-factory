//Action Creators
export const addProductToCart = (product) => {
  return {
    type: 'addProductToCart',
    payload: product
  }
}

export const removeFromCart = (productCode) => {
  return {
    type: 'removeFromCart',
    payload: productCode
  }
}

export const changeQuantity = (productCode, qty) => {
  return {
    type: 'changeExtraQuantity',
    payload: {productCode: productCode, quantity: qty}
  }
}

export const clearCart = () => {
  return {
    type: 'clearCart'
  }
}

export const addExtra = (product) => {
  return {
    type: 'addExtra',
    payload: product
  }
}

export const removeExtra = (productCode) => {
  return {
    type: 'removeExtra',
    payload: productCode
  }
}

export const changeExtraQuantity = (productCode, quantity) => {
  return {
    type: 'changeExtraQuantity',
    payload: {productCode: productCode, quantity: quantity}
  }
}

//Helper functions
const codifyProduct = (product) => {
  let productCode = '#1B' + product.base + 'S' + product.size + 'C' + product.crust + 'HH' + (product.isHalfHalf ? 1 : 0);
  for (let sectionIndex in product.toppings) {
    if ((sectionIndex < 2 || product.isHalfHalf) && product.toppings[sectionIndex].length > 0) {
      productCode += 'T' + sectionIndex;
    }
    for (let topping of [...product.toppings[sectionIndex]].sort((a,b) => a-b)) {
      productCode += '.' + topping;
    }
    if (product.toppings[sectionIndex].length > 0) {
      productCode += ':'
    }
  }
  return productCode;
}

const dummyPizza = {
  quantity: 1,
  maxQuantity: 10,
  name: 'Dummy',
  productCode: 'Whatevs',
  price: 12.99,
  calories: 412,
  base: 0,
  size: 1,
  crust: 1,
  toppings: {0: [0,18], 1:[3]},
  isHalfHalf: false,
  isVegetarian: true,
  isVegan: false,
  isGlutenFree: true,
  isSpicy: 3,
  productType: 'custom',
  image: require('../assets/pizzas/custom.png')
}

const dummyExtra = {
  productCode: 'side1',
  quantity: 3
}

//Cart reducer function
const initCart = [];
export const cartReducer = (state = initCart, action) => {
  switch(action.type) {
    case 'addProductToCart':
      if (action.payload.productCode) {
        //Update existing product
        return state.map((product, index) => {
          if (index === action.payload.id) {
            return {...action.payload, productCode: codifyProduct(action.payload)};
          } else {
            return product
          }
        })
      } else {
        //Add new product
        //Check if an identical product exists
        let foundIndex = null;
        const productCode = codifyProduct(action.payload);
        for (let cartProductIndex in state) {
          if (productCode === state[cartProductIndex].productCode) {
            foundIndex = Number(cartProductIndex);
            break;
          }
        }
        if (foundIndex !==null) {
          //Increment quantity of existing product
          return state.map((product, index) => {
            if (index === foundIndex) {
              return {...product, quantity: product.quantity + action.payload.quantity};
            } else {
              return product
            }
          })
        } else {
          return [...state,{...action.payload, id: state.length, productCode: productCode}];
        }
      }
    case 'removeFromCart':
      return state.filter(item => item.productCode !== action.payload);
    case 'changeQuantity':
      return state.map(item => item.productCode === action.payload.productCode ? {...item, quantity: action.payload.qty} : item)
    case 'addExtra':
      return [...state, action.payload];
    case 'changeExtraQuantity':
      return state.map(item => item.productCode === action.payload.productCode ? {...item, quantity: action.payload.quantity} : item)
    case 'removeExtra':
      return state.filter(item => item.productCode !== action.payload);
    case 'clearCart':
      return initCart;
    default:
      return state;
  }
}

//Selectors
export const selectCartSize = state => {
  let cartSize = 0;
  state.cart.forEach( item => cartSize += item.quantity)
  return cartSize
};
export const selectCartTotalPrice = state => {
  let total = 0;
  state.cart.forEach( item => total += (item.price * item.quantity))
  return total;
}
export const selectCartContent = state => {
  return state.cart;
}
export const selectProductQuantity = (state, productCode) => {
  for (let product of state.cart) {
    if (product.productCode === productCode) {
      return product.quantity;
    }    
  }
  return 0;
}