import makeStyles from '@mui/styles/makeStyles';

export default makeStyles( theme => ({
  root: {
    display: "flex",
    padding: "1rem 0"
  },
  "@keyframes spin": {
    "to": {
      transform: "rotate(360deg)",
    }
  },
  loading: {
    border: `.4rem solid ${theme.palette.primary.main}`,
    borderTopColor: "white",
    borderRadius: "50%",
    width: "4rem",
    height: "4rem",
    animation: "$spin 1s linear infinite",
  },
}));
