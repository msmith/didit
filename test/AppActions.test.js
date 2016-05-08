import expect from 'expect';
import { addTodoItem, completeTodoItem, uncompleteTodoItem, updateTodoItem, deleteTodoItem, archiveTodoItems} from '../js/actions/AppActions';
import { ADD_TODO, COMPLETE_TODO, UNCOMPLETE_TODO, UPDATE_TODO, DELETE_TODO, ARCHIVE_TODOS } from '../js/constants/AppConstants';

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

  // Test updateTodoItem action
  describe('updateTodoItem', () => {
    it('should change item addedAt', () => {
      const id = 3;
      const addedAt = new Date();
      const expectedResult = {
        type: UPDATE_TODO,
        id,
        addedAt
      };

      expect(updateTodoItem(id, addedAt)).toEqual(expectedResult);
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

  // Test deleteTodoItem action
  describe('deleteTodoItem', () => {
    it('should delete item', () => {
      const id = 3;
      const expectedResult = {
        type: DELETE_TODO,
        id
      };

      expect(deleteTodoItem(id)).toEqual(expectedResult);
    });
  });

  // Test archiveTodoItems action
  describe('archiveTodoItems', () => {
    it('should archive items', () => {
      const archivedAt = new Date();
      const expectedResult = {
        type: ARCHIVE_TODOS,
        archivedAt
      };

      expect(archiveTodoItems(archivedAt)).toEqual(expectedResult);
    });
  });
});
