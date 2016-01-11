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
          completedAt: undefined,
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
    const completedAt = new Date();

    const initialTodos = [
      {
        id,
        text,
        addedAt,
        completedAt: undefined
      }
    ];

    expect(
      homeReducer({todos: initialTodos}, {
        type: constants.COMPLETE_TODO,
        id,
        completedAt
      })
    ).toEqual({
      todos: [
        {
          id,
          text,
          addedAt,
          completedAt
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


  // Test that it handles uncompleting a todo correctly
  it('should handle the UNCOMPLETE_TODO action', () => {
    const id = 43;
    const text = 'wash the dog';
    const addedAt = new Date();
    const completedAt = new Date();

    const initialTodos = [
      {
        id,
        text,
        addedAt,
        completedAt
      }
    ];

    expect(
      homeReducer({todos: initialTodos}, {
        type: constants.UNCOMPLETE_TODO,
        id,
        completedAt
      })
    ).toEqual({
      todos: [
        {
          id,
          text,
          addedAt,
          completedAt: undefined
        }
      ]
    });
  });

  // Test that it handles uncompleting a todo correctly
  it('should handle a UNCOMPLETE_TODO with an invalid id', () => {
    const id = 43;

    expect(
      homeReducer({todos: []}, {
        type: constants.UNCOMPLETE_TODO,
        id
      })
    ).toEqual({
      todos: []
    });
  });
});
