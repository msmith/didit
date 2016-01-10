import expect from 'expect';
import { addTodoItem, completeTodoItem } from '../js/actions/AppActions';
import { ADD_TODO, COMPLETE_TODO } from '../js/constants/AppConstants';

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
      const expectedResult = {
        type: COMPLETE_TODO,
        id
      };

      expect(completeTodoItem(id)).toEqual(expectedResult);
    });
  });

});
