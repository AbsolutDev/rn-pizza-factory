import { StyleSheet, Dimensions } from "react-native"

const SCREEN_WIDTH = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  //App General
  appBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  appHeader: {
    backgroundColor: '#222',
  },
  //Screens
  screen: {
    backgroundColor: '#222'
  },
  //Main Screen
  mainScreenPrimaryItem: {
    height: 200,
    width: 380,
    margin: 10,
    justifyContent: 'flex-end',
    borderRadius: 30,
    overflow: 'hidden'
  },
  mainScreenPrimaryTextContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '101%',
    height: 50,
    justifyContent: "flex-end",
    marginBottom: 0
  },
  mainScreenPrimaryTextLeftTriangle: {
    backgroundColor: 'transparent',
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderLeftWidth: 20,
    borderBottomWidth: 50,
    borderLeftColor: 'transparent',
    borderBottomColor: '#111b',
    position: 'absolute',
    right: 310
  },
  mainScreenPrimaryTextRightContainer: {
    height: 50,
    backgroundColor: '#111b',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderTopLeftRadius: 20
  },
  mainScreenPrimaryText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#999',
    marginLeft: 20,
    marginRight: 30,
  },

  //Elements

  //Dietary Icon Elements
  dietaryIcon: {
    height: 18,
    width: 18,
    borderRadius: 10,
    color: '#555',
    fontSize: 9,
    textAlign: "center",
    verticalAlign: 'middle',
    marginRight: 3
  },
  dietaryGf: {
    backgroundColor: '#fc0'
  },
  dietaryVg: {
    backgroundColor: '#090'
  },
  dietaryPb: {
    backgroundColor: '#0d8'
  },
  dietaryIconsContainer: {
    flexDirection: 'row',
    marginVertical: 4
  },
  //Half-half Switch Element
  halfHalfSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 40
  },
  halfHalfSwitchText: {
    color: '#ccc',
    fontSize: 16
  },
  halfHalfFilterSwitch: {
    trackColor: {
      false: '#767577',
      true: '#005500'
    },
    thumbColor: {
      false: '#D55',
      true: '#00BB00'
    },
    iosBackgroundColor: '#3e3e3e'
  },
  //Pepper Icon Element
  pepperIcon: {
    height: 16,
    marginLeft: 0
  },
  //Item Tag Element
  itemTag: {
    backgroundColor: '#68e',
    color: '#fff',
    fontSize: 8,
    height: 18,
    borderRadius: 6,
    paddingHorizontal: 4,
    marginRight: 6,
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  //Done Button Element
  doneButton: {
    backgroundColor: '#090',
    height: 30,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  doneButtonText: {
    height: '100%',
    textAlignVertical: 'center'
  },
  //Add Pizza Button Element
  addPizzaButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#26f',
    height: 44,
    width: 120,
    marginHorizontal: 6,
    borderRadius: 8,
  },
  addPizzaButtonGf: {
    backgroundColor: '#fc0',
  },
  addPizzaButtonText: {
    color: '#eee',
    fontSize: 16,
    fontWeight: 500,
    textAlign: 'center'
  },
  addPizzaButtonTextGf: {
    color: '#555'
  },

  //Components

  //CartIcon Component
  cartIconContainer: {
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  cartIcon: {
    height: 25,
    width: 30,
  },
  cartText: {
    position: 'absolute',
    color: '#f00',
    fontWeight: 900,
    padding: 2,
    fontSize: 10,
  },
  //Dietary Legend Component
  dietaryLegendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5
  },
  dietaryLegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 28,
    backgroundColor: '#444',
    padding: 3,
    borderRadius: 14,
  },
  dietaryLegendItemSelected: {
    borderColor: '#0a0',
    borderWidth: 1
  },
  dietaryLegendText: {
    color: '#ccc',
    paddingHorizontal: 5
  },
  dietaryLegendTextUnselected: {
    color: '#888',
  },
  //Section Step Title
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#444',
    height: 58,
    padding: 10,
    borderBottomColor: '#333',
    borderBottomWidth: 2,
  },
  sectionTitleText: {
    flexGrow: 1,
    fontSize: 24,
    color: '#eee',
  },
  sectionTitleRightSide: {
    justifyContent: 'space-between',
    width: 60
  },
  sectionTitlePrice: {
    fontSize: 16,
    color: '#eee',
    textAlignVertical: 'center',
    textAlign: 'right',
    width: 60,
  },
  sectionTitleCalories: {
    fontSize: 10,
    color: '#aaa',
    textAlignVertical: 'bottom',
    textAlign: 'right',
    flexGrow: 1
  },
  //Pizza Variant Component
  pizzaComponentVariant: {
    flexDirection: 'row',
    width: SCREEN_WIDTH,
    alignItems: 'center',
    height: 104,
    marginBottom: 2
  },
  pizzaVariantSideContainer: {
    backgroundColor: '#444',
    flexDirection: 'row',
    alignItems: 'center',
    width: 12,
    height: 104,
  },
  pizzaVariantSideLeftContainer: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  pizzaVariantSideRightContainer: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  pizzaVariantMoveButton: {
    backgroundColor: '#060',
    height: '100%',
    width: '100%',
    color: '#090',
    fontWeight: 900,
    fontSize: 14,
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  pizzaVariantMoveLeftButton: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  pizzaVariantMoveRightButton: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  pizzaComponentVariantElement: {
    flexDirection: 'row',
    flexGrow: 1,
    backgroundColor: '#333',
    height: 104
  },
  //Pizza Component
  pizzaComponentText: {
    color: '#ccc',
  },
  pizzaImageContainer: {
    justifyContent: 'center'
  },
  pizzaImage: {
    width: 100,
    height: 100
  },
  pizzaInfoContainer: {
    marginLeft: 8
  },
  pizzaInfoContainerTop: {
  },
  pizzaComponentName: {
    fontSize: 20,
  },
  pizzaInfoToppingsListContainer: {
    flexDirection: 'row',
    flexGrow: 1,
    width: 260,
  },
  pizzaInfoToppingsList: {
    flex: 1,
    fontSize: 12,
    marginBottom: 10,
    textAlignVertical: 'bottom'
  },
  pizzaComponentBottom: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 12
  },
  //Choice Component
  choiceComponent: {
    flexDirection: 'row',
    backgroundColor: '#333',
    borderBottomColor: '#222',
    borderBottomWidth: 2,
    paddingHorizontal: 12,
    height: 60,
  },
  choiceComponentLarge: {
    height: 80
  },
  choiceComponentSelected: {
    backgroundColor: '#363',
  },
  choiceComponentText: {
    color: '#ccc',
  },
  choiceComponentLeftSide: {
    justifyContent: 'center',
    marginRight: 6,
  },
  choiceComponentImage: {
    width: 58,
    height: 58
  },
  choiceComponentImageLarge: {
    width: 70,
    height: 70
  },
  choiceComponentInfo: {
    flexGrow: 1
  },
  choiceComponentInfoTop: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  choiceComponentTotal: {
    width: '18%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  choiceComponentName: {
    fontSize: 20,
    fontWeight: 500,
    marginRight: 10,
  },
  choiceComponentDescription: {
    color: '#aaa',
    fontSize: 14,
    paddingLeft: 0,
  },
  choiceComponentPrice: {
    fontSize: 20,
    fontWeight: 500,
  },
  choiceComponentPriceSmall: {
    fontSize: 10,
    marginLeft: 6,
  },
  choiceComponentCalories: {
    fontSize: 10,
  },
  //Half-half Which Side Component
  sideTitle: {
    flexDirection: 'row',
    backgroundColor: '#000',
    padding: 6
  },
  sideTitleText: {
    flexGrow: 1,
    fontSize: 18,
    color: '#ccc'
  },
  sideTitleCalories: {
    fontSize: 10,
    color: '#aaa',
    textAlignVertical: 'center'
  },
  //Topping Component
  toppingContainer: {
    flexDirection: 'row',
    backgroundColor: '#333',
    borderBottomColor: '#222',
    borderBottomWidth: 2,
    paddingHorizontal: 12,
    height: 54,
  },
  toppingContainerSelected: {
    backgroundColor: '#363',
  },
  toppingContainerHighlighted: {
    backgroundColor: '#833',
  },
  toppingText: {
    color: '#ccc',
  },
  toppingImageContainer: {
    justifyContent: 'center',
    marginRight: 6,
  },
  toppingImage: {
    width: 50,
    height: 50
  },
  toppingInfo: {
    flexGrow: 1
  },
  toppingInfoTop: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  toppingInfoBottom: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  toppingName: {
    fontSize: 16,
    fontWeight: 500,
    marginRight: 6,
    marginVertical: 2
  },
  toppingDescription: {
    color: '#aaa',
    fontSize: 14,
    paddingLeft: 0,
  },
  toppingCalories: {
    fontSize: 10,
    marginRight: 5
  },
  toppingQty: {
    alignSelf: 'center',
    height: 30,
    width: 48,
    borderRadius: 8,
    fontSize: 10,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  toppingQtySingle: {
    backgroundColor: '#055',
  },
  toppingQtyExtra: {
    backgroundColor: '#080',
  },
  toppingPrice: {
    width: 50,
    marginLeft: 14,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 14,
    fontWeight: 400,
  },
  //Product Summary Component
  productSummaryDescriptionContainer: {
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  productSummaryText: {
    marginVertical: 5,
    borderRadius: 4,
    marginHorizontal: 20,
    color: '#ccc',
    fontSize: 22
  },
  productSummaryTextHighlighted: {
    color: '#fff',
  },
  productSummaryInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },
  productSummaryIconsContainer: {
    flexDirection: 'row',
    marginLeft: 10
  },
  productSummaryCalories: {
    color: '#ccc',
    fontSize: 14,
  },
  productSummaryBottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  productSummaryAddButtonWrapper: {
    marginLeft: 20,
    marginRight: 10,
    flexGrow: 1,
  },
  productSummaryAddButtonContainer: {
    flexDirection: 'row',
    height: 40,
    marginLeft: 10,
  },
  productSummaryAddButtonContainerUpdate: {
    marginLeft: 10,
    marginRight: 20
  },
  productSummaryAddButtonLeft: {
    flexGrow: 1,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    backgroundColor: '#26f',
    color: '#ccc',
    fontSize: 20,
    fontWeight: 600,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingBottom: 2
  },
  productSummaryAddButtonRight: {
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: '#02f',
    color: '#ccc',
    fontSize: 20,
    fontWeight: 700,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingBottom: 2,
    paddingHorizontal: 10
  },
  productSummaryAddButtonNoChanges: {
    backgroundColor: '#922',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  productSummaryAddButtonNoCharge: {
    backgroundColor: '#292',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  productSummaryAddButtonLeftUpdate: {
    backgroundColor: '#292',
    color: '#ccc',
    fontWeight: 600,
  },
  productSummaryAddButtonRightUpdate: {
    color: '#ccc',
    fontSize: 18,
    paddingBottom: 2,
  },
  productSummaryAddButtonRightUpdatePositive: {
    backgroundColor: '#722',
  },
  productSummaryAddButtonRightUpdateNegative: {
    backgroundColor: '#272',
  },
  //Quantity Component
  qtyButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyButton: {
    backgroundColor: '#ccc',
    color: '#111',
    width: 26,
    height: 34,
    fontSize: 22,
    fontWeight: 700,
    textAlignVertical: 'center',
    paddingBottom: 2,
    textAlign: 'center',
    borderRadius: 4,
  },
  qtyButtonInactive: {
    backgroundColor: '#555',
    color: '#111'
  },
  qtyText: {
    color: '#eee',
    fontSize: 18,
    textAlign: 'center',
    width: 30
  },
  //Extra Products Screen Components
  extraProductComponentText: {
    color: '#ccc',
  },
  extraProductComponent: {
    backgroundColor: '#445',
    marginVertical: 4,
    marginHorizontal: 6,
    borderRadius: 8
  },
  extraProductComponentTop: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    minHeight: 120,
  },
  extraProductImage: {
    marginTop: 10,
    width: 100,
    height: 100
  },
  extraProductInfo: {
    width: SCREEN_WIDTH-140,
    marginLeft: 10
  },
  extraProductName: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: 600
  },
  extraProductSize: {
    fontWeight: 400,
  },
  extraProductTagIconsWrapper: {
    flexDirection: 'row',
    marginVertical: 4
  },
  extraProductDescription: {
    fontSize: 12,
  },
  extraProductCalories: {
    marginTop: 4,
    fontSize: 12,
  },
  extraProductDietaryAndPepperIconsContainer: {
    flexDirection: 'row',
    marginTop: 4
  },
  extraProductDietaryIcons: {
    flexDirection: 'row',
    marginRight: 4
  },
  extraProductPepperIcons: {
    flexDirection: 'row',
  },
  extraProductComponentBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#667',
    paddingHorizontal: 10,
    paddingVertical: 6,
    margin: 6,
    borderRadius: 8
  },
  extraProductPrice: {
    marginLeft: 18,
    fontSize: 28,
    fontWeight: 500
  },
  //Cart Screen Components
  //Cart Item Component
  cartItemText: {
    color: '#ccc',
    fontSize: 12,
  },
  cartItemComponent: {
    backgroundColor: '#445',
    marginVertical: 4,
    marginHorizontal: 6,
    borderRadius: 8
  },
  cartItemTopContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    minHeight: 120
  },
  cartItemImage: {
    marginTop: 10,
    width: 100,
    height: 100
  },
  cartItemInfoContainer: {
    width: SCREEN_WIDTH-140,
    marginLeft: 10
  },
  cartItemNameAndBinContainer: {
    flexDirection: 'row',
  },
  cartItemName: {
    flexGrow: 1,
    marginTop: 6,
    fontSize: 20,
    fontWeight: 600,
  },
  cartItemBinButtonContainer: {
    marginLeft: 8,
    marginTop: 10
  },
  cartItemBinButton: {
    width: 22,
    height: 22
  },
  cartItemInfo: {
    marginTop: 4,
  },
  cartItemDietaryAndPepperIconsContainer: {
    flexDirection: 'row',
    marginTop: 4
  },
  cartItemDietaryIcons: {
    flexDirection: 'row',
    marginRight: 4
  },
  cartItemPepperIcons: {
    flexDirection: 'row',
  },
  cartItemQtyAndPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#667',
    paddingHorizontal: 10,
    paddingVertical: 6,
    margin: 6,
    borderRadius: 8
  },
  cartItemPrice: {
    marginLeft: 18,
    fontSize: 28,
    fontWeight: 500
  },
  //Cart Pizza Component
  cartPizzaToppingsContainer: {
    marginTop: 8,
    width: SCREEN_WIDTH-130
  },
  cartPizzaToppingList: {
    color: '#aaa'
  },
  cartPizzaToppingLeftHalf: {
    fontWeight: 600,
    color: '#2ae',
  },
  cartPizzaToppingRightHalf: {
    fontWeight: 600,
    color: '#e66',
  },
  cartPizzaToppingListHighlighted: {
    fontWeight: 600
  },
  //Cart Extra Component
  
  //Cart Summary
  cartSummaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 10
  },
  cartCompleteOrderButton: {
    backgroundColor: '#090',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 220,
    borderRadius: 12,
  },
  cartCompleteOrderButtonText: {
    fontSize: 20,
    fontWeight: 600,
    color: '#020',
  },
  cartSummaryTotal: {
    color: '#ddd',
    fontSize: 24,
    fontWeight: 500,
    marginBottom: 2
  },


  bottomMenu : {
    backgroundColor: '#222',
    flexDirection: 'row',
    height: 60,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  homeIconContainer: {
    alignItems: 'center',
  },
  homeIcon: {
    height: 30,
    width: 25,
  },
  homeText: {
    color: '#fff',
    fontSize: 10,
    paddingVertical: 3
  },
  userIconContainer: {
    alignItems: 'center',
  },
  userIcon: {
    height: 30,
    width: 30,
  },
  userText: {
    color: '#fff',
    fontSize: 10,
    paddingVertical: 3
  },
})