import React, { useEffect } from "react";
import { Box } from "@mui/material";
import useFetch from "../../useFetch.hook";
import useStyles from "./BookList.styles.js";
const { default: Book } = require("../book/Book.component");

const BookList = () => {
  const [{ isLoading, error, response: books = [] }, doFetch] = useFetch(
    "https://unibook-server.herokuapp.com/books"
  );

  // function localStorageEvents(){
  // useEffect(() => {
  //   if(books.length) return
  //   doFetch()
  // }, [doFetch, books])

  // useEffect(() => {
  //   if(isLoading === false && response) setBooks(response)
  //   return window.sessionStorage.setItem("books", JSON.stringify(books));
  // }, [isLoading, response, books])
  // }
  useEffect(() => {
    doFetch();
  }, [doFetch]);

  const classes = useStyles();

  return (
    <Box component={"section"} width="100%" style={{ padding: "1rem 0" }}>
      {isLoading && (
        <Box display="flex" justifyContent="center">
          <div className={classes.loading}></div>
        </Box>
      )}
      {books?.map((book) => (
        <Book key={book._id} {...book} hasLink />
      ))}
      {error && (
        <Box display="flex" justifyContent="center">
          <h1>
            Error Please, check url spelling or check your network. Thank you.{" "}
          </h1>
        </Box>
      )}
      {!error && !isLoading && !(books?.length > 0) && (
        <Box display="flex" justifyContent="center">
          <h1>Register and upload Books to have them available for download</h1>
        </Box>
      )}
    </Box>
  );
};

export default BookList;
