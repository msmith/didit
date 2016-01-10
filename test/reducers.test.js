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

  // Test that it handles completing a todo correctly
  it('should handle the COMPLETE_TODO action', () => {
    const id = 42;
    const text = 'wash the dog';
    const addedAt = new Date();

    const initialTodos = [
      {
        completed: false,
        id,
        addedAt,
        text
      }
    ];

    expect(
      homeReducer({todos: initialTodos}, {
        type: constants.COMPLETE_TODO,
        id
      })
    ).toEqual({
      todos: [
        {
          completed: true,
          id,
          addedAt,
          text
        }
      ]
    });
  });

  // Test that it handles completing a todo correctly
  it('should handle a COMPLETE_TODO with an invalid id', () => {
    const id = 42;

    expect(
      homeReducer({todos: []}, {
        type: constants.COMPLETE_TODO,
        id
      })
    ).toEqual({
      todos: []
    });
  });


});
