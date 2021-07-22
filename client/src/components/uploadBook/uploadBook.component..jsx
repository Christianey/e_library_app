import React, { useState, useRef } from "react";
import { Box, Grid, makeStyles, Paper } from "@material-ui/core";
import Controls from "../controls/Controls.component";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "100%",
      marginBottom: theme.spacing(1.6),
    },
  },
  paper: {
    padding: `${theme.spacing(4)}px ${theme.spacing(5)}px`,
    margin: theme.spacing(1.8),
  },
  "@keyframes spin": {
    "to": {
      transform: "rotate(360deg)",
    }
  },
  loading: {
    border: `.2rem solid ${theme.palette.primary.main}`,
    borderTopColor: "white",
    borderRadius: "50%",
    width: "2rem",
    height: "2rem",
    animation: "$spin 1s linear infinite",
  }
}));

const initialValues = {
  title: "",
  author: "",
  faculty: "",
  department: "",
  file: null
};

const UploadBook = () => {
  const ref = useRef();
  const [values, setValues] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false)
  console.log(values.title)

  const classes = useStyles();

  const handleInputChange = (e) => {
    e.preventDefault();

    setValues({
      ...values,
      title: values.title.length 
        ? values.title 
        : e.target.files[0].name.split('.')[0],
      file: e.target.files[0],
    });
  };

  const handleChange = (e) => {
    e.preventDefault();

    const { value, name } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { file , ...data } = values;

    const formData = new FormData()
    formData.append("file", file)
    formData.append("data", data)

    console.log(values)
    if (ref.current.reportValidity()) {
      setIsLoading(true)
      axios({
        url: "http://localhost:5000/book/upload",
        method: "POST",
        headers: {
          "x-access-token": `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
        data: formData
      })
        .then( response => {
          setIsLoading(false)
          ref.current.reset()
          setValues({...initialValues})
          alert("Book Uploaded")
        })
        .catch( error => console.log("Error: ", error.response) )
        .finally( () => setIsLoading(false) )
    }
  };

  return (
    <form ref={ref}>
      <Box component={Paper} className={classes.paper}>
        <Box component={Grid} container>
          <Grid item xs={12}>
            <Controls.Textfield
              type="text"
              name="title"
              label="Book Title"
              placeholder="Choose file to automatically fill with book name from file"
              onChange={handleChange}
              value={values.title}
              required
              fullWidth
            />
            <Controls.Textfield
              type="text"
              name="author"
              label="Author"
              onChange={handleChange}
              value={values.author}
              fullWidth
            />
            <Controls.Textfield
              type="text"
              name="faculty"
              label="Faculty"
              onChange={handleChange}
              value={values.faculty}
              fullWidth
            />
            <Controls.Textfield
              type="text"
              name="department"
              label="Department"
              onChange={handleChange}
              value={values.department}
              fullWidth
            />
          </Grid>
          <input type="file" name="file" onChange={handleInputChange} />
        </Box>
      </Box>
      <Box component={Grid} container justifyContent="center" marginTop={3}>
        <Controls.Button  onClick={handleSubmit}>
          {isLoading ? <div className={classes.loading}></div> : "SUBMIT"}
        </Controls.Button>
      </Box>
    </form>
  );
};

export default UploadBook;
