import { makeStyles } from "@material-ui/core/styles";
import { deepPurple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  appBar: {
    direction: "ltr",
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 50px",
  },
  heading: {
    color: "rgba(0,183,255, 1)",
    textDecoration: "none",
  },
  image: {
    marginLeft: "15px",
  },
  toolbar: {
    display: "flex",
    width: "400px",
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "400px",
    direction: "ltr",
  },
  subProfile: {
    display: "flex",
    "& h6": {
      marginRight: "10px",
    },
  },
  userName: {
    display: "flex",
    alignItems: "center",
    color: "#616161",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    "& img": {
      width: "100%",
      height: "100%",
    },
    "& h6": {},
  },
}));
