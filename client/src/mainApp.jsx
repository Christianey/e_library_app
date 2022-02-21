import { Redirect, Route, Switch } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Header from "./components/header/Header.component";
import BookList from "./components/bookList/BookList.component";
import BookPage from "./pages/book/BookPage.component";
import SignInSignUpPage from "./pages/signInSignUp/SignInSignUpPage.component";
import SearchPage from "./pages/search/SearchPage.component";
import ProfilePage from "./pages/profile/ProfilePage.component.jsx";
import useStyle from "./App.styles.js";

const MainApp = () => {
  const classes = useStyle();
  return (
    <>
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
    </>
  );
};

export default MainApp;
