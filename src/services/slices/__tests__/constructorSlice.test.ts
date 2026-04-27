import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from '../constructorSlice';
import { TIngredient } from '../../../utils/types';

const mockIngredient: TIngredient = {
  _id: '1',
  name: 'Тестовый ингредиент',
  type: 'main',
  price: 100,
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 100,
  image: '',
  image_large: '',
  image_mobile: ''
};

describe('constructorSlice', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  it('should return initial state', () => {
    expect(constructorReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should add ingredient', () => {
    const action = addIngredient(mockIngredient);
    const state = constructorReducer(initialState, action);
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0].name).toBe('Тестовый ингредиент');
  });

  it('should remove ingredient', () => {
    const stateWithIngredient = {
      bun: null,
      ingredients: [{ ...mockIngredient, id: '123' }]
    };
    const action = removeIngredient('123');
    const state = constructorReducer(stateWithIngredient, action);
    expect(state.ingredients).toHaveLength(0);
  });

  it('should clear constructor', () => {
    const stateWithItems = {
      bun: { ...mockIngredient, id: 'bun1' },
      ingredients: [{ ...mockIngredient, id: '123' }]
    };
    const action = clearConstructor();
    const state = constructorReducer(stateWithItems, action);
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(0);
  });

  it('should move ingredient', () => {
    const stateWithIngredients = {
        bun: null,
        ingredients: [
        { ...mockIngredient, id: '1' },
        { ...mockIngredient, id: '2' }
        ]
    };
    const action = moveIngredient({ from: 0, to: 1 });
    const state = constructorReducer(stateWithIngredients, action);
    expect(state.ingredients[0].id).toBe('2');
    expect(state.ingredients[1].id).toBe('1');
    });
});