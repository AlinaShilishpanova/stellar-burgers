import { rootReducer } from '../reducers/rootReducer';

describe('rootReducer', () => {
  it('should return initial state with unknown action', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    
    expect(initialState).toBeDefined();
    expect(initialState.constructor).toBeDefined();
    expect(initialState.ingredients).toBeDefined();
    expect(initialState.order).toBeDefined();
    expect(initialState.user).toBeDefined();
    expect(initialState.feed).toBeDefined();
    expect(initialState.profileOrders).toBeDefined();
    expect(initialState.ingredientDetails).toBeDefined();
  });
});