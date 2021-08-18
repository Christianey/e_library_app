import React, { useState, useRef } from "react";
import {
  FormControlLabel,
  Box,
  FormLabel,
  Grid,
  InputLabel,
  makeStyles,
  Paper,
  StepLabel,
} from "@material-ui/core";
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
    to: {
      transform: "rotate(360deg)",
    },
  },
  loading: {
    border: `.2rem solid ${theme.palette.primary.main}`,
    borderTopColor: "white",
    borderRadius: "50%",
    width: "2rem",
    height: "2rem",
    animation: "$spin 1s linear infinite",
  },
  inputFile: {
    opacity: 0,
    zIndex: -1,
    position: "absolute",
    top: "3rem",
    left: "0",
  },
  inputLabelButton: {
    backgroundColor: `#e2e2e2`,
    borderRadius: `${theme.spacing(0.5)}px`,
    marginTop: "1rem",
    padding: "2rem",
    width: "13rem",
    height: "5rem",
    color: "#2f2f2f",
    fontWeight: "bold",
    cursor: "pointer",
    display: "inline-grid",
    placeContent: "center",
  },
}));

const initialValues = {
  title: "",
  author: "",
  faculty: "",
  department: "",
  file: null,
};

const UploadBook = () => {
  const ref = useRef();
  const [values, setValues] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();

  const handleInputChange = (e) => {
    e.preventDefault();

    if (!e.target.files[0]) return;

    setValues({
      ...values,
      title: values.title.length
        ? values.title
        : e.target.files[0].name.split(".")[0],
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
    const { file, ...data } = values;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", data);

    if (ref.current.reportValidity()) {
      setIsLoading(true);
      axios({
        url: "https://unibook-server.herokuapp.com/book/upload",
        method: "POST",
        headers: {
          "x-access-token": `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
        data: formData,
      })
        .then((response) => {
          setIsLoading(false);
          ref.current.reset();
          setValues({ ...initialValues });
          alert("Book Uploaded");
        })
        .catch((error) => console.log("Error: ", error.response))
        .finally(() => setIsLoading(false));
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
          <div className="input-wrapper" style={{ position: "relative" }}>
            <label htmlFor="input-file" className={classes.inputLabelButton}>
              Browse File...
            </label>
            <span style={{ marginLeft: "2rem", fontStyle: "italic" }}>
              {values.file?.name || "No file selected"}
            </span>
            <input
              type="file"
              className={classes.inputFile}
              name="file"
              id="input-file"
              onChange={handleInputChange}
              accept="application/pdf"
              required
            />
          </div>
        </Box>
      </Box>
      <Box component={Grid} container justifyContent="center" marginTop={3}>
        <Controls.Button onClick={handleSubmit}>
          SUBMIT{" "}
          {isLoading && (
            <div
              className={classes.loading}
              style={{ marginLeft: "1rem" }}
            ></div>
          )}
        </Controls.Button>
      </Box>
    </form>
  );
};

export default UploadBook;
