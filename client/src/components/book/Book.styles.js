import { makeStyles } from "@material-ui/core";

export default makeStyles({
  root: {
    display: "flex",
    marginBottom: "2.5rem", 
    minHeight: "16rem"
  }, 
  img: {
    minWidth: "12rem",
    marginRight: "1rem"
  },
  cardContent: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  typography: {
    maxWidth: "80%",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
})