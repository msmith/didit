import expect from 'expect';
import { addTodoItem, completeTodoItem, uncompleteTodoItem, removeTodoItem} from '../js/actions/AppActions';
import { ADD_TODO, COMPLETE_TODO, UNCOMPLETE_TODO, REMOVE_TODO } from '../js/constants/AppConstants';

// Test actions from AppActions.js
describe('AppActions', () => {
  // Test addTodoItem action
  describe('addTodoItem', () => {
    it('should add a new item', () => {
      const id = 1;
      const text = 'wash the dog';
      const addedAt = new Date();
      const expectedResult = {
        type: ADD_TODO,
        id,
        text,
        addedAt
      };

      expect(addTodoItem(id, text, addedAt)).toEqual(expectedResult);
    });
  });

  // Test completeTodoItem action
  describe('completeTodoItem', () => {
    it('should mark item as completed', () => {
      const id = 3;
      const completedAt = new Date();
      const expectedResult = {
        type: COMPLETE_TODO,
        id,
        completedAt
      };

      expect(completeTodoItem(id, completedAt)).toEqual(expectedResult);
    });
  });

  // Test uncompleteTodoItem action
  describe('uncompleteTodoItem', () => {
    it('should mark item as not completed', () => {
      const id = 3;
      const expectedResult = {
        type: UNCOMPLETE_TODO,
        id
      };

      expect(uncompleteTodoItem(id)).toEqual(expectedResult);
    });
  });

  // Test removeTodoItem action
  describe('removeTodoItem', () => {
    it('should remove item', () => {
      const id = 3;
      const expectedResult = {
        type: REMOVE_TODO,
        id
      };

      expect(removeTodoItem(id)).toEqual(expectedResult);
    });
  });
});
