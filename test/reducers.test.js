import expect from 'expect';
import todosReducer from '../js/reducers/todosReducer';
import debugReducer from '../js/reducers/debugReducer';
import * as constants from '../js/constants/AppConstants';

// Test Reducer
describe('todosReducer', () => {
  // Test that the initial state is returning correctly
  it('should return the initial state', () => {
    expect(todosReducer(undefined, {})).toEqual([]);
  });

  // Test that it handles adding a todo correctly
  it('should handle the ADD_TODO action', () => {
    const id = 42;
    const text = 'wash the dog';
    const addedAt = new Date();

    expect(
      todosReducer({todos: []}, {
        type: constants.ADD_TODO,
        id,
        text,
        addedAt
      })
    ).toEqual([
      {
        completedAt: undefined,
        id,
        addedAt,
        text
      }
    ]);
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
      todosReducer(initialTodos, {
        type: constants.COMPLETE_TODO,
        id,
        completedAt
      })
    ).toEqual([
      {
        id,
        text,
        addedAt,
        completedAt
      }
    ]
  );
  });

  // Test that it handles completing a todo correctly
  it('should handle a COMPLETE_TODO with an invalid id', () => {
    const id = 42;

    expect(
      todosReducer([], {
        type: constants.COMPLETE_TODO,
        id
      })
    ).toEqual([]);
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
      todosReducer(initialTodos, {
        type: constants.UNCOMPLETE_TODO,
        id,
        completedAt
      })
    ).toEqual([
      {
        id,
        text,
        addedAt,
        completedAt: undefined
      }
    ]);
  });

  // Test that it handles uncompleting a todo correctly
  it('should handle a UNCOMPLETE_TODO with an invalid id', () => {
    const id = 43;

    expect(
      todosReducer([], {
        type: constants.UNCOMPLETE_TODO,
        id
      })
    ).toEqual([]);
  });

  // Test that it handles updating a todo correctly
  it('should handle the UPDATE_TODO action', () => {
    const id = 42;
    const text = 'wash the dog';
    const addedAt = new Date(2001, 1, 2);
    const initialTodos = [
      { id, addedAt, text }
    ];
    const newAddedAt = new Date();

    expect(
      todosReducer(initialTodos, {
        type: constants.UPDATE_TODO,
        id,
        addedAt: newAddedAt
      })
    ).toEqual([
      {
        id,
        addedAt: newAddedAt,
        text
      }
    ]);
  });

  // Test that it handles removing a todo correctly
  it('should handle the DELETE_TODO action', () => {
    const id = 42;
    const text = 'wash the dog';
    const addedAt = new Date();
    const initialTodos = [
      { id, addedAt, text },
      { id: 1, addedAt: new Date(), text: 'remove me' }
    ];

    expect(
      todosReducer(initialTodos, {
        type: constants.DELETE_TODO,
        id: 1
      })
    ).toEqual([
      { id, addedAt, text }
    ]);
  });

  // Test that it handles archiving todos correctly
  it('should handle the ARCHIVE_TODOS action', () => {
    const mon = new Date(2016, 1, 2);
    const tue = new Date(2016, 1, 3);
    const wed = new Date(2016, 1, 4);
    const archivedAt = new Date();
    const initialTodos = [
      { id: 1, addedAt: mon },
      { id: 2, addedAt: mon, completedAt: mon },
      { id: 3, addedAt: tue, completedAt: wed },
      { id: 4, addedAt: tue },
      { id: 5, addedAt: wed }
    ];

    expect(
      todosReducer(initialTodos, {
        type: constants.ARCHIVE_TODOS,
        archivedAt
      })
    ).toEqual([
      { id: 1, addedAt: mon },
      { id: 2, addedAt: mon, completedAt: mon, archivedAt },
      { id: 3, addedAt: tue, completedAt: wed, archivedAt },
      { id: 4, addedAt: tue },
      { id: 5, addedAt: wed }
    ]);
  });
});

describe('debugReducer', () => {
  // Test that the initial state is returning correctly
  it('should return the initial state', () => {
    expect(debugReducer(undefined, {})).toEqual(false);
  });

  // Test that it handles toggling debug mode correctly
  it('should handle the TOGGLE_DEBUG action to disable debug mode', () => {
    expect(
      debugReducer(true, {
        type: constants.TOGGLE_DEBUG
      })
    ).toEqual(false);
  });

  // Test that it handles toggling debug mode correctly
  it('should handle the TOGGLE_DEBUG action to enable debug mode', () => {
    expect(
      debugReducer(false, {
        type: constants.TOGGLE_DEBUG
      })
    ).toEqual(true);
  });
});
