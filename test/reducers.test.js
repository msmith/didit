import expect from 'expect';
import homeReducer from '../js/reducers/homeReducer';
import * as constants from '../js/constants/AppConstants';

// Test Reducer
describe('defaultReducer', () => {
  // Test that the initial state is returning correctly
  it('should return the initial state', () => {
    expect(homeReducer(undefined, {})).toEqual({
      todos: [],
      debug: false
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

  // Test that it handles moving a todo correctly
  it('should handle the MOVE_TODO action', () => {
    const id = 42;
    const text = 'wash the dog';
    const addedAt = new Date(2001, 1, 2);
    const initialTodos = [
      { id, addedAt, text }
    ]
    const newAddedAt = new Date();

    expect(
      homeReducer({todos: initialTodos}, {
        type: constants.MOVE_TODO,
        id,
        addedAt: newAddedAt
      })
    ).toEqual({
      todos: [
        {
          id,
          addedAt: newAddedAt,
          text
        }
      ]
    });
  });

  // Test that it handles removing a todo correctly
  it('should handle the REMOVE_TODO action', () => {
    const id = 42;
    const text = 'wash the dog';
    const addedAt = new Date();
    const initialTodos = [
      { id, addedAt, text }
    ]

    expect(
      homeReducer({todos: initialTodos}, {
        type: constants.REMOVE_TODO,
        id
      })
    ).toEqual({
      todos: []
    });
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
      homeReducer({todos: initialTodos}, {
        type: constants.ARCHIVE_TODOS,
        archivedAt
      })
    ).toEqual({
      todos: [
        { id: 1, addedAt: mon },
        { id: 2, addedAt: mon, completedAt: mon, archivedAt },
        { id: 3, addedAt: tue, completedAt: wed, archivedAt },
        { id: 4, addedAt: tue },
        { id: 5, addedAt: wed }
      ]
    });
  });

  // Test that it handles toggling debug mode correctly
  it('should handle the TOGGLE_DEBUG action to disable debug mode', () => {
    expect(
      homeReducer({debug: true}, {
        type: constants.TOGGLE_DEBUG
      })
    ).toEqual({
      debug: false
    });
  });

  // Test that it handles toggling debug mode correctly
  it('should handle the TOGGLE_DEBUG action to enable debug mode', () => {
    expect(
      homeReducer({debug: false}, {
        type: constants.TOGGLE_DEBUG
      })
    ).toEqual({
      debug: true
    });
  });

  // Test that it handles toggling debug mode correctly
  it('should handle the CHANGE_TAB action to change the active tab', () => {
    const tab = 'a';
    expect(
      homeReducer({tab: 'z'}, {
        type: constants.CHANGE_TAB, tab
      })
    ).toEqual({
      tab: 'a'
    });
  });

});
