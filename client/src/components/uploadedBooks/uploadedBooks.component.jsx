import { useEffect } from "react";
import useFetch from "../../useFetch.hook";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Box,
  Paper,
  Checkbox,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useSelector } from "react-redux";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2rem",
    paddingBottom: "4rem",
    "& .MuiTable-root": {
      "& th.MuiTableCell-root.MuiTableCell-head:not(:nth-child(2)), td.MuiTableCell-root.MuiTableCell-body:not(:nth-child(2))":
        {
          textAlign: "center",
        },
      "& .MuiTableRow-root": {
        height: "6rem",
        "& .MuiCheckbox-root": {
          height: "inherit",
        },
      },
      "& .MuiTableRow-root:last-child": {
        "& .MuiTableCell-root:not(th)": {
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
    width: "2rem",
    maxWidth: "30rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

const UploadedBooks = () => {
  const classes = useStyles();

  const {
    data: { username },
  } = useSelector((state) => state.user);

  const [{ isLoading, response }, doFetch] = useFetch(
    `https://unibook-server.herokuapp.com/books/${username}`
  );

  useEffect(() => {
    const authToken = localStorage.getItem("token");
    if (authToken) {
      axios.defaults.headers.common["x-access-token"] = `Bearer ${authToken}`;
    } else {
      delete axios.defaults.headers.common["x-access-token"];
    }

    doFetch({
      method: "GET",
      withCredentials: true,
    });
  }, [doFetch]);

  return (
    <div>
      <Paper className={classes.root}>
        <Table>
          <colgroup>
            <col style={{ width: "1%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "5%" }} />
            <col style={{ width: "5%" }} />
            <col style={{ width: "5%" }} />
            <col style={{ width: "5%" }} />
            <col style={{ width: "5%" }} />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Pages</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={7} style={{ borderBottom: 0 }}>
                  <Box display="flex" justifyContent="center">
                    <div className={classes.loading}></div>
                  </Box>
                </TableCell>
              </TableRow>
            )}

            {response?.uploadedBooks
              ? response?.uploadedBooks?.map((uploadedBook) => (
                  <TableRow
                    key={uploadedBook._id}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                  >
                    <Checkbox
                      style={{
                        // display: "flex",
                        alignItems: "center",
                        // width: "100%",
                      }}
                      disableRipple
                      disableHoverRipple
                      disableTouchRipple
                      // checked={isItemSelected}
                    />
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
                      {
                        new Date(uploadedBook?.date)
                          .toLocaleString()
                          .split(", ")[0]
                      }
                    </TableCell>
                    <TableCell>
                      <Edit />
                    </TableCell>
                    <TableCell>
                      <Delete />
                    </TableCell>
                  </TableRow>
                ))
              : null}
            {response?.uploadedBooks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} style={{ borderBottom: 0 }}>
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
