import expect from 'expect';
import homeReducer from '../js/reducers/homeReducer';
import * as constants from '../js/constants/AppConstants';

// Test Reducer
describe('defaultReducer', () => {
  // Test that the initial state is returning correctly
  it('should return the initial state', () => {
    expect(homeReducer(undefined, {})).toEqual({
      todos: []
    });
  });

  // Test that it handles adding a todo correctly
  it('should handle the ADD_TODO action', () => {
    const id = 42;
    const text = 'wash the dog';
    const addedAt = new Date();

    expect(
      homeReducer({todos: []}, {
        type: constants.ADD_TODO,
        id,
        text,
        addedAt
      })
    ).toEqual({
      todos: [
        {
          completed: false,
          id,
          addedAt,
          text
        }
      ]
    });
  });
});
