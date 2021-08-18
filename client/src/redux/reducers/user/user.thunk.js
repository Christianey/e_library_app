import axios from "axios";
import actions from "./user.actions";

export const loadUserAsync = (data) => (dispatch) => {
  dispatch(actions.userLoadStart());

  axios({
    url: "https://unibook-server.herokuapp.com/user/login",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000/",
    },
    data: data,
    withCredentials: true,
  })
    .then((response) => {
      console.log(response);
      localStorage.setItem("token", response.data.token);
      dispatch(actions.userLoadSuccess(response.data.user));
    })
    .catch((error) => {
      console.log(error.response);
      dispatch(actions.userLoadError(error.response));
    });
};

export const registerUserAsync = (data) => (dispatch) => {
  dispatch(actions.userLoadStart());

  axios({
    url: "https://unibook-server.herokuapp.com/user/register",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000/",
    },
    data: data,
    withCredentials: true,
  })
    .then((response) => {
      console.log(response);
      localStorage.setItem("token", response.data.token);
      dispatch(actions.userLoadSuccess(response.data.user));
    })
    .catch((error) => {
      console.log(error.response);
      dispatch(actions.userLoadError(error.response));
    });
};
