import { useState } from "react";
import { Box, makeStyles, Typography, Tabs, Tab } from "@material-ui/core";
import UploadBook from "../../components/uploadBook/uploadBook.component";
import UploadedBooks from "../../components/uploadedBooks/uploadedBooks.component";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import EnhancedTable from "../../components/tableTest/enhancedTable.component";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    "& .MuiFormControl-root": {
      width: "100%",
      marginBottom: theme.spacing(1.6),
    },
  },
  paper: {
    padding: `${theme.spacing(4)}px ${theme.spacing(5)}px`,
    margin: theme.spacing(1.8),
  },
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index ? <Box p={3}>{children}</Box> : null}
    </div>
  );
}

const ProfilePage = () => {
  const user = useSelector((state) => state.user.data);

  const classes = useStyles();

  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  if (!user) {
    return <Redirect to="/books" />;
  }

  return (
    <div className={classes.root}>
      <Typography component="h3" variant="h4">
        Welcome, {`@${user.username}`}
      </Typography>
      <Tabs value={value} onChange={handleChange} indicatorColor="primary">
        <Tab label="Books Uploaded" {...a11yProps(0)} />
        <Tab label="Upload Book" {...a11yProps(1)} />
        <Tab label="Enhanced Table" {...a11yProps(2)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <UploadedBooks />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <UploadBook />
      </TabPanel>

      {/* <TabPanel value={value} index={2}>
        <EnhancedTable />
      </TabPanel> */}
    </div>
  );
};

export default ProfilePage;
