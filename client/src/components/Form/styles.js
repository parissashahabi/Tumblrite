import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  title: { marginBottom: "10px" },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  brandContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    margin: "50px 0",
  },
  welcomeText: {
    marginBottom: "20px",
  },
  fileInput: {
    width: "95%",
    margin: "10px 0",
    border: "1px #757575 dashed",
    borderRadius: "4px",
    padding: "15px 15px",
    color: "#616161",
  },
  buttonSubmit: {
    marginBottom: 10,
  },
  imageTypography: {
    marginBottom: "10px",
  },
}));
