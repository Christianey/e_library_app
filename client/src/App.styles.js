import makeStyles from '@mui/styles/makeStyles';

export default makeStyles( theme => ({
  padding: {
    padding: "0 10rem",
    [theme.breakpoints.down('lg')]: {
      padding: "0 1rem"
    }
  }
}))