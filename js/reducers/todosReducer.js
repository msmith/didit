import { ADD_TODO, COMPLETE_TODO, UNCOMPLETE_TODO, UPDATE_TODO, DELETE_TODO, ARCHIVE_TODOS } from '../constants/AppConstants';
import { modifyItemInList } from '../utils/assign';

const withId = (id) => (t) => id === t.id;

const modifyTodoItem = (todos, id, newObject) => {
  return modifyItemInList(todos, withId(id), newObject);
};

const deleteTodos = (todos, filterFn) => todos.filter((t) => !filterFn(t));

function todosReducer(state = [], action) {
  Object.freeze(state); // Don't mutate state directly, always use assign()!
  switch (action.type) {
    case ADD_TODO:
      const todos = [
        ...state,
        {
          id: action.id,
          text: action.text,
          addedAt: action.addedAt,
          completedAt: undefined
        }
      ];
      return todos;
    case COMPLETE_TODO:
      return modifyTodoItem(state, action.id, {
        completedAt: action.completedAt
      });
    case UNCOMPLETE_TODO:
      return modifyTodoItem(state, action.id, {
        completedAt: undefined
      });
    case UPDATE_TODO:
      return modifyTodoItem(state, action.id, {
        addedAt: action.addedAt
      });
    case DELETE_TODO:
      return deleteTodos(state, withId(action.id));
    case ARCHIVE_TODOS:
      let newTodos = state;
      for (const t of newTodos) {
        if (t.completedAt && !t.archivedAt) {
          newTodos = modifyItemInList(newTodos, withId(t.id), {
            archivedAt: action.archivedAt
          });
        }
      }
      return newTodos;
    default:
      return state;
  }
}

export default todosReducer;
