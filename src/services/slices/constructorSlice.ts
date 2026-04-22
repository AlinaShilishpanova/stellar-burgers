import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../../utils/types';

interface ConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      const ingredient = {
        ...action.payload,
        id: crypto.randomUUID()
      };
      if (ingredient.type === 'bun') {
        state.bun = ingredient;
      } else {
        // ГАРАНТИЯ: убеждаемся, что ingredients — это массив
        if (!state.ingredients) {
          state.ingredients = [];
        }
        state.ingredients.push(ingredient);
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      if (state.ingredients) {
        state.ingredients = state.ingredients.filter(
          (item) => item.id !== action.payload
        );
      }
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      if (state.ingredients && state.ingredients.length > 0) {
        const { from, to } = action.payload;
        const ingredients = [...state.ingredients];
        const [movedItem] = ingredients.splice(from, 1);
        ingredients.splice(to, 0, movedItem);
        state.ingredients = ingredients;
      }
    },
    clearConstructor: () => initialState
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = constructorSlice.actions;
export default constructorSlice.reducer;
