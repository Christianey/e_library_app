import makeStyles from "@mui/styles/makeStyles";

export default makeStyles({
  root: {
    display: "flex",
    marginBottom: "2.5rem",
    maxHeight: "16rem",
  },
  img: {
    minWidth: "12rem",
    marginRight: "1rem",
  },
  cardContent: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingRight: "3rem",
  },
  typography: {
    maxWidth: "80%",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});
