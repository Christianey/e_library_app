import React from "react";
import useStyles from './SignInSignUpPage.styles.js'
import { Box, Grid, Typography } from "@material-ui/core";
import SignUp from "../../components/signUp/SignUp.component";
import SignIn from "../../components/signIn/SignIn.component";

const SignInSignUpPage = ({pageHeader, signIn}) => {
  const classes = useStyles();
  
  return (
    <Box component={Grid} className={classes.root}>
      <Grid item xs={12}>
        <Typography component="h1" variant="h4" align="center">
          {pageHeader}
        </Typography>
      </Grid>
      <Box component={Grid} justifySelf="center" xs={12} sm={8} md={12} className={classes.align} item>
        {signIn ? <SignIn /> : <SignUp />}
      </Box>
    </Box>
  );
};

export default SignInSignUpPage;
