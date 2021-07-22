import headerLogo from "../../assets/Investor_Kola_Mock1.png";
import { useState } from 'react'
import {
  Grid,
  AppBar,
  InputBase,
  Toolbar,
  Button,
  Box,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import BackspaceIcon from '@material-ui/icons/Backspace';
import { Redirect } from 'react-router-dom'
import useStyle from "./Header.styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/reducers/user/user.actions";
import axios from "axios";

const Header = () => {
  const classes = useStyle();

  const user = useSelector((state) => state.user);

  const [search, setSearch] = useState("")

  const [searchResults, setSearchResults] = useState(null)

  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(actions.userUnload());
    alert("Signed out successfully")
  };

  const handleChange = e => {
    const value = e.target.value
    setSearch(value)
  }

  const handleClear = e => {
    setSearch("")
  }

  const handleKeyPress = e => {
    const {name, value} = e.target
    if(e.keyCode === 13) {
      axios({
        url: `http://localhost:5000/book/search`,
        method: "GET",
        params: {
          [name]: value
        },
        withCredentials: true
      })
        .then( response => {
          setSearchResults(response.data)
          setSearchResults(null)
        })
        .catch( error => console.log(error))
    }
  }

  return (
    <AppBar position="static" className={`${classes.coloring} ${classes.root}`}>
      <Toolbar>
        <Box component={Grid} container className={classes.container}>
          <div>
            <div
              className="logo-wrapper"
              style={{ width: "3rem", display: "flex" }}
            >
              <Box component={Link} to="/books" display="flex" width="3rem">
                <img
                  src={headerLogo}
                  alt="Header Logo"
                  className={classes.headerLogo}
                />
              </Box>
            </div>
          </div>

          <Grid item md={6}>
            <InputBase
              className={`${classes.search}`}
              placeholder="Search for Book"
              fullWidth
              onKeyDown={handleKeyPress}
              onChange={handleChange}
              inputProps={{
                name: "search",
                value: search,
              }}
              startAdornment={
                <SearchIcon fontSize="small" className={classes.searchIcon} />
              }
              endAdornment={
                <BackspaceIcon
                  fontSize="small"
                  className={classes.backspaceIcon}
                  onClick={handleClear}
                />
              }
            />
          </Grid>

          {user.data ? (
            <Box display="flex" alignItems="center">
              <Link
                to="/me"
                style={{ color: "currentColor", textDecoration: "none" }}
              >
                <AccountCircle fontSize="large" />
              </Link>
              <Button
                className={classes.textButton}
                variant="text"
                size="large"
                onClick={handleClick}
              >
                SIGN OUT
              </Button>
            </Box>
          ) : (
            <Box>
              <Link
                to="/sign-in"
                style={{ color: "currentColor", textDecoration: "none" }}
              >
                <Button
                  className={classes.textButton}
                  variant="text"
                  size="large"
                >
                  SIGN IN
                </Button>
              </Link>
              <Link
                to="/sign-up"
                style={{ color: "currentColor", textDecoration: "none" }}
              >
                <Button className={classes.button} variant="outlined">
                  SIGN UP
                </Button>
              </Link>
            </Box>
          )}
        </Box>
      </Toolbar>
      {searchResults && <Redirect
        to={{
          pathname: "/book/search",
          state: {
            books: searchResults,
          },
        }}
      />}
    </AppBar>
  );
};

export default Header;
