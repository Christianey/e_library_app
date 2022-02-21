import { Box } from "@mui/material";
import Book from "../../components/book/Book.component";

const SearchPage = ({
  location: {
    state: { books },
  },
}) => {
  return books?.length ? (
    <Box component={"section"} width="100%" style={{ padding: "1rem 0" }}>
      <h1>Search Results: </h1>
      {books?.map((book) => (
        <Book key={book._id} {...book} hasLink />
      ))}
    </Box>
  ) : (
    <h1>Sorry, book not found</h1>
  );
};

export default SearchPage;
