import useStyle from "./App.styles.js";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import Header from "./components/header/Header.component";
import BookList from "./components/bookList/BookList.component";
import BookPage from "./pages/book/BookPage.component";
import SignInSignUpPage from "./pages/signInSignUp/SignInSignUpPage.component";
import SearchPage from "./pages/search/SearchPage.component";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import ProfilePage from "./pages/profile/ProfilePage.component.jsx";
import { purple } from "@material-ui/core/colors";
import axios from "axios";

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 10,
  },
  palette: {
    primary: {
      main: purple["700"],
    },
    secondary: {
      main: purple["700"],
    },
  },
});

function App() {
  const classes = useStyle();

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    if (authToken) {
      axios.defaults.headers.common["x-access-token"] = `Bearer ${authToken}`;
    } else {
      delete axios.defaults.headers.common["x-access-token"];
    }
  }, []);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Header />
        <main className={`${classes.padding} ${classes.color}`}>
          <Switch>
            <Route path="/me" component={ProfilePage} />
            <Route
              path="/sign-in"
              render={() => <SignInSignUpPage signIn pageHeader="Sign In" />}
            />
            <Route
              path="/sign-up"
              render={() => <SignInSignUpPage pageHeader="Sign Up" />}
            />
            <Route exact path="/book/search" component={SearchPage} />
            <Route exact path="/books/:id" component={BookPage} />
            <Route exact path="/books" component={BookList} />
            <Route>
              <Redirect to="/books" />
            </Route>
          </Switch>
        </main>
        <CssBaseline />
      </ThemeProvider>
    </Router>
  );
}

export default App;
