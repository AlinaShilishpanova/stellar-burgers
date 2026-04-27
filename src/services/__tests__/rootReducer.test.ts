import { rootReducer } from '../reducers/rootReducer';

describe('rootReducer', () => {
  it('should return initial state with unknown action', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(initialState).toBeDefined();
    expect(initialState.constructor).toBeDefined();
    expect(initialState.ingredients).toBeDefined();
  });
});