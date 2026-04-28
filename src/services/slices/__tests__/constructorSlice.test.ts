import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from '../constructorSlice';
import { TIngredient } from '../../../utils/types';

const mockBun: TIngredient = {
  _id: 'bun1',
  name: 'Тестовая булка',
  type: 'bun',
  price: 100,
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 100,
  image: '',
  image_large: '',
  image_mobile: ''
};

const mockMainIngredient: TIngredient = {
  _id: 'main1',
  name: 'Тестовая начинка',
  type: 'main',
  price: 50,
  proteins: 5,
  fat: 5,
  carbohydrates: 5,
  calories: 50,
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

  it('should add bun', () => {
    const action = addIngredient(mockBun);
    const state = constructorReducer(initialState, action);
    expect(state.bun).not.toBeNull();
    expect(state.bun?.name).toBe('Тестовая булка');
    expect(state.ingredients).toHaveLength(0);
  });

  it('should add main ingredient', () => {
    const action = addIngredient(mockMainIngredient);
    const state = constructorReducer(initialState, action);
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0].name).toBe('Тестовая начинка');
    expect(state.bun).toBeNull();
  });

  it('should remove ingredient', () => {
    const stateWithIngredient = {
      bun: null,
      ingredients: [{ ...mockMainIngredient, id: '123' }]
    };
    const action = removeIngredient('123');
    const state = constructorReducer(stateWithIngredient, action);
    expect(state.ingredients).toHaveLength(0);
  });

  it('should move ingredient', () => {
    const stateWithIngredients = {
      bun: null,
      ingredients: [
        { ...mockMainIngredient, id: '1', name: 'Первый' },
        { ...mockMainIngredient, id: '2', name: 'Второй' }
      ]
    };
    const action = moveIngredient({ from: 0, to: 1 });
    const state = constructorReducer(stateWithIngredients, action);
    expect(state.ingredients[0].name).toBe('Второй');
    expect(state.ingredients[1].name).toBe('Первый');
  });

  it('should clear constructor', () => {
    const stateWithItems = {
      bun: { ...mockBun, id: 'bun1' },
      ingredients: [{ ...mockMainIngredient, id: '123' }]
    };
    const action = clearConstructor();
    const state = constructorReducer(stateWithItems, action);
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(0);
  });
});