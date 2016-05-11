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

describe('groupForDate', () => {
  it('should return date string if date is after the end of today', () => {
    const now = new Date(Date.parse('2016-04-05T06:07:08-05:00'));
    const date = new Date(Date.parse('2016-04-06T00:00:00-05:00'));
    expect(todos.groupForDate(date, now)).toEqual('Wed, Apr 6');
  });

  it('should return "Today" if date is the same', () => {
    const now = new Date(Date.parse('2016-04-05T06:07:08-05:00'));
    const date = now;
    expect(todos.groupForDate(date, now)).toEqual('Today');
  });

  it('should return "Today" if date is the beginning of today', () => {
    const now = new Date(Date.parse('2016-04-05T06:07:08-05:00'));
    const date = new Date(Date.parse('2016-04-05T00:00:00-05:00'));
    expect(todos.groupForDate(date, now)).toEqual('Today');
  });

  it('should return "Today" if date is the end of today', () => {
    const now = new Date(Date.parse('2016-04-05T06:07:08-05:00'));
    const date = new Date(Date.parse('2016-04-05T23:59:59-05:00'));
    expect(todos.groupForDate(date, now)).toEqual('Today');
  });

  it('should return "Yesterday" if date is the beginning of yesterday', () => {
    const now = new Date(Date.parse('2016-04-05T06:07:08-05:00'));
    const date = new Date(Date.parse('2016-04-04T00:00:00-05:00'));
    expect(todos.groupForDate(date, now)).toEqual('Yesterday');
  });

  it('should return "Yesterday" if date is the end of yesterday', () => {
    const now = new Date(Date.parse('2016-04-05T06:07:08-05:00'));
    const date = new Date(Date.parse('2016-04-04T23:59:59-05:00'));
    expect(todos.groupForDate(date, now)).toEqual('Yesterday');
  });

  it('should return "This month" if date is earlier than yesterday, but in this month', () => {
    const now = new Date(Date.parse('2016-04-05T06:07:08-05:00'));
    const date = new Date(Date.parse('2016-04-03T23:59:59-05:00'));
    expect(todos.groupForDate(date, now)).toEqual('This month');
  });

  it('should return month if date is earlier than this month, but in this year', () => {
    const now = new Date(Date.parse('2016-04-05T06:07:08-05:00'));
    const date = new Date(Date.parse('2016-03-31T23:59:59-05:00'));
    expect(todos.groupForDate(date, now)).toEqual('March');
  });

  it('should return month and year if date is earlier than this year', () => {
    const now = new Date(Date.parse('2016-04-05T06:07:08-05:00'));
    const date = new Date(Date.parse('2015-12-31T23:59:59-05:00'));
    expect(todos.groupForDate(date, now)).toEqual('December 2015');
  });

});
