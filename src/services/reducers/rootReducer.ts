import { combineReducers } from '@reduxjs/toolkit';
import constructorReducer from '../slices/constructorSlice';
import ingredientsReducer from '../slices/ingredientsSlice';
import orderReducer from '../slices/orderSlice';
import userReducer from '../slices/userSlice';
import feedReducer from '../slices/feedSlice';
import profileOrdersReducer from '../slices/profileOrdersSlice';
import ingredientDetailsReducer from '../slices/ingredientDetailsSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  user: userReducer,
  feed: feedReducer,
  profileOrders: profileOrdersReducer,
  ingredientDetails: ingredientDetailsReducer
});
