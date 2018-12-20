import * as actions from '../actions';

const initialState = {
  error: null,
  images: [],
  formData: { fields: [], vocab: [] },
};

const reducer = (state = initialState, action) => {
  const handlers = {
    [actions.FETCH_FORM_FIELDS_END]() {
      if (action.data.hasOwnProperty('error')) {
        return Object.assign({}, state, { error: action.data.error });
      }

      return Object.assign({}, state, {
        formData: action.data,
        error: null,
      });
    },
    [actions.FETCH_IMAGES_END]() {
      if (action.data.hasOwnProperty('error')) {
        return Object.assign({}, state, { error: action.data.error });
      }

      return Object.assign({}, state, { images: action.data, error: null });
    },
  };

  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action);
  }
  return state;
};

export default reducer;
