import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import GoogleAuth from "../auth/GoogleAuth";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = ({ isSignedIn }) => {
  const classes = useStyles();
  return (
    <AppBar
      position="sticky"
      style={{ background: "#0A0C21", color: "#8899a6" }}
      className="appbar"
    >
      <Toolbar className="toolbar">
        <Typography variant="h6" className={classes.title}>
          <Link to="/" className="nav-link nav-title">
            Streams
          </Link>
        </Typography>

        <div className="nav-links">
          {/* <Link to="/streams/show" className="nav-link">
            Find a stream
          </Link> */}
          {/* {isSignedIn && (
            <Link to="/streams/new" className="nav-link">
              Create a stream
            </Link>
          )} */}
          {/* <Link to="/streams/edit" className="nav-link">
            Edit a stream
          </Link>
          <Link to="/streams/delete" className="nav-link">
            Delete a stream
          </Link> */}
        </div>
        <GoogleAuth />
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = ({ auth: { isSignedIn } }) => {
  return {
    isSignedIn,
  };
};

export default connect(mapStateToProps)(Navbar);
