/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./loginpage.css";
import { Container, Modal } from "semantic-ui-react";
import { Redirect } from "react-router";
import JotFormAPI from "jotform";

const styleLinkHref =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";

/* Login Page class component */
class LoginPage extends Component {
  constructor(props) {
    super(props);
    const { authorized } = this.props;
    this.state = { loginSuccess: authorized, loginFailed: false };
  }

  /**
   * Gets username
   * @returns {string}
   */
  getUsername = () => {
    const username = document.getElementById("username").value;
    const atIndex = username.indexOf("@");
    return atIndex > -1 ? username.substring(0, atIndex) : username;
  };

  /**
   * Gets password
   * @returns {string}
   */
  getPassword = () => {
    return document.getElementById("password").value;
  };

  /**
   * Gets login form data
   * @returns {FormData}
   */
  getLoginFormData = () => {
    const bodyFormData = new FormData();
    bodyFormData.set("username", this.getUsername());
    bodyFormData.set("password", this.getPassword());
    bodyFormData.set("appName", "SubmissionGenerator");
    bodyFormData.set("access", "full");
    return bodyFormData;
  };

  /**
   * Login failed check
   * @param {object} response
   * @returns {boolean}
   */
  isFailed = response => {
    return response.data.responseCode === 401;
  };

  /**
   * Set login results
   * @param {boolean} failed
   * @param {boolean} success
   */
  setLoginResult = (failed, success) => {
    this.setState({ loginFailed: failed });
    this.setState({ loginSuccess: success });
  };

  /**
   * Set  JotForm API Configuration
   * @param {object} response
   */
  setAPIConfiguration = response => {
    const { appKey } = response.data.content;
    JotFormAPI.options({
      debug: true,
      apiKey: appKey
    });
  };

  /* Login function using axios */
  login = () => {
    const self = this;
    const { getUserData } = this.props;
    const formData = this.getLoginFormData();
    axios({
      method: "post",
      url: "https://api.jotform.com/user/login",
      data: formData,
      config: {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    })
      .then(function success(response) {
        if (self.isFailed(response)) {
          /* Login failed */
          self.setLoginResult(true, false);
        } else {
          /* Login success */
          self.setAPIConfiguration(response);
          getUserData();
          self.setLoginResult(false, true);
        }
      })
      .catch(function fail() {});
  };

  render() {
    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = styleLinkHref;
    document.head.appendChild(styleLink);

    const { loginSuccess, loginFailed } = this.state;

    /* Redirects authorized user to forms page */
    if (loginSuccess) {
      return <Redirect to="/forms" />;
    }

    /* Renders Login Form */
    return (
      <>
        <img
          className="landing-page"
          src="../jotform-landing-page.PNG"
          alt="landing"
        />
        <Container style={{ margin: 20 }} className="app-background">
          <Modal open>
            <Modal.Content image className="background">
              <Modal.Description>
                <div>
                  <>
                    <div className="title">Welcome Back!</div>
                    <p className="info">
                      Customize forms, save time &amp; effort and collect online
                      payments easily.
                    </p>
                    <>
                      <form className="login-form">
                        <label htmlFor="jfHeader_username" className="username">
                          Username
                        </label>
                        <input
                          id="username"
                          name="username"
                          className="jfHeader-authFormInput"
                          type="text"
                          autoComplete="off"
                        />
                        <label> </label>

                        <label htmlFor="jfHeader_username" className="username">
                          Password
                        </label>
                        <input
                          id="password"
                          name="password"
                          className="jfHeader-authFormInput"
                          type="password"
                          autoComplete="off"
                        />
                        {loginFailed && (
                          <div className="login-failed">
                            Login failed - Username or password did not match.
                          </div>
                        )}

                        <label> </label>
                        <a
                          id="forgotPasswordButtonNav"
                          className="forgotPassword"
                        >
                          Forgot password?
                        </a>
                        <label> </label>

                        <button
                          id="login-button"
                          className="login-button"
                          onClick={this.login}
                          type="button"
                        >
                          <span className="spanText">Log in</span>
                        </button>
                      </form>
                      <p className="footer-text">
                        Don’t have an account?
                        <button type="button" className="signup-button">
                          Sign up
                        </button>
                      </p>
                    </>
                  </>
                </div>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </Container>
      </>
    );
  }
}

/* Prop types */
LoginPage.propTypes = {
  authorized: PropTypes.bool.isRequired,
  getUserData: PropTypes.func.isRequired
};

export default LoginPage;
