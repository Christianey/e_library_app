import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";
import useStyles from "./Book.styles";
import { Link } from "react-router-dom";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import { purple } from "@mui/material/colors";

const Book = (props) => {
  const { hasLink, ...book } = props;

  const classes = useStyles();

  return (
    <Card component={Grid} className={classes.root} width="100%">
      <CardMedia
        className={classes.img}
        image={`${book.url
          .split(".")
          .join(" ")
          .replace("pdf", "jpg")
          .replace(/\s/g, ".")}`}
      />
      <Box
        component={CardContent}
        className={classes.cardContent}
        gap={"1.5rem"}
      >
        <Box display="flex" justifyContent="space-between">
          <Typography
            component="h4"
            variant="h4"
            fontSize={["1.3rem", "2rem", "2rem", "2rem"]}
            className={classes.typography}
          >
            {hasLink ? (
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
            ) : (
              book.title
            )}
          </Typography>
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

        <Box
          sx={{
            "& .MuiTypography-root ": {
              fontSize: ["1rem", "1rem ", "2rem ", "2rem "],
            },
          }}
        >
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
