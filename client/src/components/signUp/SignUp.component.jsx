import { Box, Grid, makeStyles, Paper } from "@material-ui/core";
import axios from "axios";
import React, { useRef, useState } from "react";
import Controls from "../controls/Controls.component";
import { Redirect } from 'react-router-dom'

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
    [theme.breakpoints.up('md')]: {
      margin: `${theme.spacing(1.8)}px ${theme.spacing(3)}rem`
    }
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
  const [values, setValues] = useState(initialValues);

  const ref = useRef()
  const classes = useStyles(initialValues);

  const handleChange = (e) => {
    const { value, name } = e.target;


    setValues({
      ...values,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const {username, department, faculty, level, password} = values
    const data = {
      username, 
      department,
      faculty,
      level,
      password
    };

    
    if (ref.current.reportValidity()) {
      axios({
        method: "POST",
        url: "http://localhost:5000/user/register",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000/"
        },
        data: data,
        withCredentials: true
      })
        .then((response) => {
          alert("Sign-up Successful!\nNow you can log-in")
          setValues(initialValues)
        })
        .catch((error) => console.log(error.response.fields));
    }
  };

  return (
    <form onSubmit={handleSubmit} ref={ref} className={classes.root} autoComplete="false" >
      <Box component={Paper} className={classes.paper}>
        <Grid container>
          <Grid item xs={12}>
            <Controls.Textfield
              type="text"
              name="username"
              label="Username"
              value={values.username}
              onChange={handleChange}
              inputProps={{
                minLength:"5"}}
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
                  minLength: "8"
                }}
                required
              />
            </Grid>
          </Box>
        </Grid>
      </Box>
      <Box component={Grid} container justifyContent="center" marginTop={3}>
        <Controls.Button type="submit" onClick={handleSubmit}>SUBMIT</Controls.Button>
      </Box>
    </form>
  );
};

export default SignUp;
