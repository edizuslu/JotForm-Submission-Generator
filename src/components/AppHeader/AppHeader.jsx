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

/* Styles of App Header */

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

export default function AppHeader(props) {
  AppHeader.propTypes = {
    setAuthFalse: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  };

  const classes = useStyles();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const [authorized, setAuthorized] = useState(true);
  const { setAuthFalse, user } = props;
  const { avatarUrl, name, year } = user;

  /* Logout operation with JotformAPI */

  function logout() {
    axios.get(`https://api.jotform.com/v1/user/logout`).then(() => {
      setAuthorized(false);
      setAuthFalse();
    });
  }

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

  /* Redirects unauthorized user to login page */

  if (!authorized) {
    return <Redirect to="/" />;
  }

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
                    <Button onClick={logout} basic color="red">
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
