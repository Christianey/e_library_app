import { useEffect, useState } from "react";
import useFetch from "../../useFetch.hook";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Box,
  Paper,
  Checkbox
} from "@material-ui/core";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2rem",
    "& .MuiTableBody-root": {
      "& .MuiTableRow-root:last-child": {
        "& .MuiTableCell-root": {
          borderBottom: 0,
        },
      },
    },
  },
  "@keyframes spin": {
    to: {
      transform: "rotate(360deg)",
    },
  },
  loading: {
    border: `.4rem solid ${theme.palette.primary.main}`,
    borderTopColor: "white",
    borderRadius: "50%",
    width: "4rem",
    height: "4rem",
    animation: "$spin 1s linear infinite",
  },
  ellipsis: {
    maxWidth: "50rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));



const UploadedBooks = () => {
  const classes = useStyles();
  const [selected, setSelected] = useState([])

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const {
    data: { username },
  } = useSelector((state) => state.user);
  
  const [{ isLoading, error, response }, doFetch] = useFetch(
    `http://localhost:5000/books/${username}`
  );

  useEffect(() => {
    doFetch({
      method: "GET",
      withCredentials: true,
    });
  }, [doFetch]);

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
  
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
  
    setSelected(newSelected);
  };
  console.log(response)

  return (
    <div>
      <h1>Uploaded Books</h1>
      <Paper className={classes.root}>
        <Table>
          <colgroup>
            <col style={{ width: "5%" }} />
            <col style={{ width: "60%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "5%" }} />
            <col style={{ width: "15%" }} />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Pages</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={5} style={{borderBottom: 0}}>
                  <Box display="flex" justifyContent="center">
                    <div className={classes.loading}></div>
                  </Box>
                </TableCell>
              </TableRow>
            )}
            {response?.uploadedBooks ? (response?.uploadedBooks?.map((uploadedBook) => (
              <TableRow
                key={uploadedBook._id}
                hover
                role="checkbox"
                tabIndex={-1}
                >
                
                <Checkbox
                  // checked={isItemSelected}
                />
                {/* {categories.map(
                  (category) => (
                    <TableCell
                      key={category}
                    >
                      <Typography className={classes.ellipsis}>{uploadedBook[category]}</Typography>
                    </TableCell>
                  ) */}
                <TableCell className={classes.ellipsis}>
                  {uploadedBook.title.slice(0, -4)}
                </TableCell>
                <TableCell className={classes.ellipsis}>
                  {uploadedBook.pages}
                </TableCell>
                <TableCell className={classes.ellipsis}>{`${(
                  uploadedBook?.size / 1048576
                ).toFixed(2)}MB`}</TableCell>
                <TableCell className={classes.ellipsis}>
                  {new Date(uploadedBook?.date).toLocaleString().split(", ")[0]}
                </TableCell>
              </TableRow>
            ))): null}
            {response?.uploadedBooks.length == 0 ? (
              <TableRow>
                <TableCell colSpan={5} style={{borderBottom: 0}}>
                  <Box display="flex" justifyContent="center">
                    <h1>You haven't uploaded any books yet</h1>
                  </Box>
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default UploadedBooks;
