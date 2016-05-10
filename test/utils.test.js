import expect from 'expect';
import * as todos from '../js/utils/todos.js';

describe('addDays', () => {
  it('should return same date for 0', () => {
    const date = new Date();
    expect(todos.addDays(date, 0)).toEqual(date);
  });

  it('should handle positive integers', () => {
    const date = new Date();
    const expectedDate = new Date(new Date().getTime() + 3 * todos.MS_PER_DAY);
    expect(todos.addDays(date, 3)).toEqual(expectedDate);
  });

  it('should handle negative integers', () => {
    const date = new Date();
    const expectedDate = new Date(new Date().getTime() - 1 * todos.MS_PER_DAY);
    expect(todos.addDays(date, -1)).toEqual(expectedDate);
  });
});
