import { TOGGLE_DEBUG } from '../constants/AppConstants';

function debugReducer(state = false, action) {
  Object.freeze(state); // Don't mutate state directly, always use assign()!
  switch (action.type) {
    case TOGGLE_DEBUG:
      return !state;
    default:
      return state;
  }
}

export default debugReducer;
