import { makeStyles } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";

const useStyle = makeStyles((theme) => ({
  root: {
    padding: "0 4rem",
  },
  coloring: {
    backgroundColor: purple["700"],
  },
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "nowrap",
  },
  button: {
    zIndex: 1,
    position: "relative",
    fontSize: "inherit",
    fontFamily: "inherit",
    color: "white",
    padding: "0.5em 1em",
    border: "1px solid white",
    "&::before": {
      content: '""',
      zIndex: -1,
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "white",
      transformOrigin: "center left",
      transform: "scaleX(0)",
      transition: "transform 0.25s ease-in-out",
    },
    "&:hover": {
      cursor: "pointer",

      "& span": {
        color: theme.palette.primary.main
      }
    },
    "&:hover::before": {
      transformOrigin: "center left",
      transform: "scaleX(1)",
    }
  },
  textButton: {
    color: "white",
  },
  search: {
    fontSize: "2rem",
    color: "#ffffff",
    borderBottom: "1px solid white",
    padding: "0 2rem",
  },
  searchIcon: {
    marginRight: "1rem",
  },
  backspaceIcon: {
    cursor: "pointer"
  },
  headerLogo: {
    minWidth: "100%",
  },
}));

export default useStyle;
