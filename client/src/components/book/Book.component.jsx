import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import useStyles from "./Book.styles";
import { Link } from "react-router-dom";
import CloudDownloadOutlinedIcon from "@material-ui/icons/CloudDownloadOutlined";
import { purple } from "@material-ui/core/colors";

const Book = (props) => {
  const { hasLink, ...book } = props;
  console.log(book);

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.img}
        image={`${book.url
          .split(".")
          .join(" ")
          .replace("pdf", "jpg")
          .replace(/\s/g, ".")}`}
      />
      <Box component={CardContent} className={classes.cardContent}>
        <Box display="flex" justifyContent="space-between">
          {hasLink ? (
            <Typography
              component="h4"
              variant="h4"
              className={classes.typography}
            >
              <Link
                to={{
                  pathname: `/books/${book["_id"]}`,
                  state: {
                    book: { ...book },
                  },
                }}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {book.title}
              </Link>
            </Typography>
          ) : (
            <Typography
              component="h4"
              variant="h4"
              className={classes.typography}
            >
              {book.title}
            </Typography>
          )}
          <a
            href={book.url}
            style={{ textDecoration: "none", color: purple["700"] }}
            download
            target="_blank"
            rel="noreferrer"
          >
            <CloudDownloadOutlinedIcon fontSize="large" />
          </a>
        </Box>

        <Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1" color="textSecondary">
              No. of Pages: {book.pages}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Size: {`${(book.size / 1048576).toFixed(2)}MB`}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1" color="textSecondary">
              Author: {book.author || "N/A"}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Date: {new Date(book.date).toLocaleString().split(", ")[0]}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default Book;
