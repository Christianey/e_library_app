import { Box, Grid, Paper } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Controls from "../controls/Controls.component";
import { Redirect } from "react-router-dom";
import { registerUserAsync } from "../../redux/reducers/user/user.thunk";
import userActionTypes from "../../redux/reducers/user/user.actionTypes";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "100%",
      marginBottom: theme.spacing(1.6),
    },
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

const levels = [100, 200, 300, 400, 500, 600];

const initialValues = {
  username: "",
  faculty: "",
  department: "",
  level: levels[0],
  password: "",
};

const SignUp = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [values, setValues] = useState(initialValues);

  const ref = useRef();
  const classes = useStyles(initialValues);

  useEffect(() => {
    return () => {
      dispatch({ type: userActionTypes.USER_CLEAR_ERROR });
    };
  }, [dispatch]);

  const handleChange = (e) => {
    const { value, name } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (ref.current.reportValidity()) {
      dispatch(registerUserAsync(values));
    }
  };

  if (user.data) return <Redirect to="/me" />;

  return (
    <form
      onSubmit={handleSubmit}
      ref={ref}
      className={classes.root}
      autoComplete="false"
    >
      <Box
        component={Paper}
        className={classes.paper}
        px={[".5rem", "1rem", "1rem", "1rem"]}
        maxWidth={"50rem"}
      >
        <Grid container>
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
              value={values.username}
              onChange={handleChange}
              inputProps={{
                minLength: "5",
              }}
              required
            />

            <Controls.Textfield
              type="text"
              name="faculty"
              label="Faculty"
              onChange={handleChange}
              value={values.faculty}
              required
            />

            <Controls.Textfield
              type="text"
              name="department"
              label="Department"
              value={values.department}
              onChange={handleChange}
              required
            />
          </Grid>

          <Box
            component={Grid}
            item
            xs={12}
            container
            justifyContent="space-between"
          >
            <Grid item xs={3}>
              <Controls.Select
                options={levels}
                name="level"
                label="Level"
                value={values.level}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={8}>
              <Controls.Textfield
                type="password"
                name="password"
                value={values.password}
                label="password"
                onChange={handleChange}
                placeholder="Please, input password"
                inputProps={{
                  minLength: "8",
                }}
                required
              />
            </Grid>
          </Box>
        </Grid>
      </Box>
      <Box component={Grid} container justifyContent="center" marginTop={3}>
        <Controls.Button type="submit" onClick={handleSubmit}>
          SUBMIT
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

export default SignUp;
