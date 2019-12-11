/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card, Image, Popup } from "semantic-ui-react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";

/* App header style */
const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}));

/* App Header Functional Component */
export default function AppHeader(props) {
  /* Prop types */
  AppHeader.propTypes = {
    setAuthFalse: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  };

  /* State initialization */
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  /* Handle mobile menu closing action */
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  /**
   * Handle mobile menu opening action
   * @param {object} event
   */
  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  /* State initialization */
  const [authorized, setAuthorized] = useState(true);
  const { setAuthFalse, user } = props;

  /* Logout function using axios */
  function logout() {
    axios.get(`https://api.jotform.com/v1/user/logout`).then(() => {
      setAuthorized(false);
      setAuthFalse();
    });
  }

  /* Mobile menu for responsive design */
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  /* User account info */
  const { avatarUrl, name, year } = user;

  const classes = useStyles();

  /* Redirects unauthorized user to login page */
  if (!authorized) {
    return <Redirect to="/" />;
  }

  /* Renders app header  */
  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{ backgroundColor: "#444" }}>
        <Toolbar>
          <Link to="/forms">
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <Avatar src="https://www.jotform.com/resources/assets/icon/min/icon.jpg" />
            </IconButton>
          </Link>
          <Typography
            className={classes.title}
            variant="h6"
            style={{ marginLeft: "10px" }}
            noWrap
          >
            JotForm Submission Generator
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Popup
              content={
                <Card>
                  <Image src={avatarUrl} wrapped ui={false} />
                  <Card.Content>
                    <Card.Header>{name}</Card.Header>
                    <Card.Meta>Joined in {year}</Card.Meta>
                  </Card.Content>
                  <Card.Content extra>
                    <Button onClick={logout} inverted color="red">
                      Logout
                    </Button>
                  </Card.Content>
                </Card>
              }
              on="click"
              pinned
              position="bottom right"
              trigger={
                <IconButton
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <Avatar src={avatarUrl} />
                </IconButton>
              }
            />
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
}
