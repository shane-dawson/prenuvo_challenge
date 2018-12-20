export const FETCH_FORM_FIELDS = 'FETCH_FORM_FIELDS';
export const FETCH_FORM_FIELDS_END = 'FETCH_FORM_FIELDS_END';
export const FETCH_FORM_FIELDS_FAIL = 'FETCH_FORM_FIELDS_FAIL';
export const FETCH_IMAGES = 'FETCH_IMAGES';
export const FETCH_IMAGES_FAIL = 'FETCH_IMAGES_FAIL';
export const FETCH_IMAGES_END = 'FETCH_IMAGES_END';

export const fetchJson = async (endpoint, method = 'GET') => {
  const url = `${endpoint}`;
  try {
    const resp = await fetch(url, {
      credentials: 'same-origin',
      method,
    });
    return resp.json();
  } catch (e) {
    await Promise.reject(e);
  }
};

export const fetchFormFields = () => async dispatch => {
  dispatch({ type: FETCH_FORM_FIELDS });
  const endpoint = `/api/v1/form/`;
  try {
    const json = await fetchJson(endpoint);
    await dispatch({ type: FETCH_FORM_FIELDS_END, data: json });
  } catch (e) {
    await dispatch({ type: FETCH_FORM_FIELDS_FAIL, error: e });
  }
};

export const fetchImages = () => async dispatch => {
  dispatch({ type: FETCH_IMAGES });
  const endpoint = `/api/v1/images/`;
  try {
    const json = await fetchJson(endpoint);
    await dispatch({ type: FETCH_IMAGES_END, data: json });
  } catch (e) {
    await dispatch({ type: FETCH_IMAGES_FAIL, error: e });
  }
};
