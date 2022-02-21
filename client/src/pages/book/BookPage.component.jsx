import { Box } from "@mui/material";
import React from "react";
import { useHistory } from "react-router";
import Book from "../../components/book/Book.component";

const BookPage = () => {
  const {
    location: {
      state: { book },
    },
  } = useHistory();

  return (
    <Box component={"section"} width="100%" style={{ padding: "3rem 0" }}>
      <Book {...book} />
    </Box>
  );
};

export default BookPage;
