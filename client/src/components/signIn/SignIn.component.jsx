import { Box, Grid, makeStyles, Paper } from "@material-ui/core";
import React, { useState, useRef, useEffect } from "react";
import Controls from "../controls/Controls.component";
import { Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loadUserAsync } from "../../redux/reducers/user/user.thunk";
import userActionTypes from "../../redux/reducers/user/user.actionTypes";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "100%",
      marginBottom: theme.spacing(1.6),
    },
  },
  paper: {
    padding: `${theme.spacing(4)}px ${theme.spacing(5)}px`,
    margin: theme.spacing(1.8),
  },
  "@keyframes spin": {
    to: {
      transform: "rotate(360deg)",
    },
  },
  loading: {
    border: `.2rem solid ${theme.palette.primary.main}`,
    borderTopColor: "white",
    borderRadius: "50%",
    width: "2rem",
    height: "2rem",
    animation: "$spin 1s linear infinite",
  },
}));

const initialValues = {
  username: "",
  password: "",
};

const SignIn = () => {
  const user = useSelector((state) => {
    return state.user;
  });

  const dispatch = useDispatch();

  const ref = useRef();
  const [values, setValues] = useState(initialValues);

  const classes = useStyles(initialValues);

  useEffect(() => {
    return () => {
      dispatch({ type: userActionTypes.USER_CLEAR_ERROR });
    };
  }, [dispatch]);

  const handleChange = (e) => {
    e.preventDefault();

    const { value, name } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (ref.current.reportValidity()) {
      dispatch(loadUserAsync(values));
    }
  };

  if (user.data) {
    return <Redirect to="/me" />;
  }

  return (
    <form
      action="POST"
      className={classes.root}
      ref={ref}
      autoComplete="false"
      onSubmit={handleSubmit}
    >
      <Box component={Paper} className={classes.paper}>
        <Box component={Grid} container>
          <Grid item xs={12}>
            {user?.error?.data?.message && (
              <span
                style={{
                  marginBottom: "1rem",
                  color: "red",
                  display: "block",
                  textAlign: "center",
                }}
              >
                {user.error.data.message}
              </span>
            )}
            <Controls.Textfield
              type="text"
              name="username"
              label="Username"
              onChange={handleChange}
              value={values.username}
              required
              fullWidth
            />
            <Controls.Textfield
              type="password"
              name="password"
              label="Password"
              onChange={handleChange}
              value={values.password}
              placeholder="Please, input password"
              required
            />
          </Grid>
        </Box>
      </Box>
      <Box component={Grid} container justifyContent="center" marginTop={3}>
        <Controls.Button type="submit">
          LOG IN{" "}
          {user.isLoading && (
            <div
              className={classes.loading}
              style={{ marginLeft: "1rem" }}
            ></div>
          )}
        </Controls.Button>
      </Box>
    </form>
  );
};

export default SignIn;
