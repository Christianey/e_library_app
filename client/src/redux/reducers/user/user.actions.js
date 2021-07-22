import actionTypes from "./user.actionTypes";

const userLoadStart = () => ({
  type: actionTypes.USER_LOAD_START
})

const userLoadSuccess = (user) => ({
  type: actionTypes.USER_LOAD_SUCCESS,
  payload: user
})

const userLoadError = (error) => ({
  type: actionTypes.USER_LOAD_ERROR,
  payload: error
})

const userUnload = () => ({
  type: actionTypes.USER_UNLOAD
})

const userLoad = (user) => ({
  type: actionTypes.USER_LOAD,
  payload: user
})

const actions = {
  userLoadStart,
  userLoadSuccess,
  userLoadError,
  userUnload,
  userLoad
}

export default actions