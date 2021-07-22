import { makeStyles } from '@material-ui/core'

export default makeStyles( theme => ({
  padding: {
    padding: "0 10rem",
    [theme.breakpoints.down('md')]: {
      padding: "0 1rem"
    }
  }
}))