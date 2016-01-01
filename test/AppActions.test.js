import expect from 'expect';
import { addTodoItem } from '../js/actions/AppActions';
import { ADD_TODO } from '../js/constants/AppConstants';

// Test actions from AppActions.js
describe('AppActions', () => {
  // Test addTodoItem action
  describe('addTodoItem', () => {
    it('should add a new item', () => {
      const id = 1;
      const text = 'wash the dog';
      const expectedResult = {
        type: ADD_TODO,
        id,
        text
      };

      expect(addTodoItem(id, text)).toEqual(expectedResult);
    });
  });

});
