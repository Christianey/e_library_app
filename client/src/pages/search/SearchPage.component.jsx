import {Box} from '@material-ui/core';
import Book from '../../components/book/Book.component'

const SearchPage = ({location: {state: {books}}}) => {
  return (
      <Box component={"section"} width="100%" style={{padding: "1rem 0"}}>
        <h1>Search Results: </h1>
        {
          books?.map(book => (
            <Book key={book._id} {...book} hasLink />
          ))
        }
      </Box>
  )
}

export default SearchPage