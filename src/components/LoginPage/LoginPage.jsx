/* eslint-disable react/jsx-filename-extension */
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

class LoginPage extends Component {
  constructor(props) {
    super(props);
    const { authorized } = this.props;
    this.state = { loginSuccess: authorized, loginFailed: false };
  }

  /* Gets username and password of user from login form */

  getFormData = () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const atIndex = username.indexOf("@");
    const bodyFormData = new FormData();
    bodyFormData.set(
      "username",
      atIndex > -1 ? username.substring(0, atIndex) : username
    );
    bodyFormData.set("password", password);
    bodyFormData.set("appName", "SubmissionGenerator");
    bodyFormData.set("access", "full");

    return bodyFormData;
  };

  /* Login operation using JotForm API */

  login = () => {
    const self = this;
    const { getUserData } = this.props;
    const formData = this.getFormData();
    axios({
      method: "post",
      url: "https://api.jotform.com/user/login",
      data: formData,
      config: { headers: { "Content-Type": "multipart/form-data" } }
    })
      .then(function success(response) {
        const userInfo = response.data.content;
        if (response.data.responseCode === 401) {
          self.setState({ loginFailed: true });
          self.setState({ loginSuccess: false });
        } else {
          JotFormAPI.options({
            debug: true,
            apiKey: "428018ef390622096e28065f850ddfd0" // "428018ef390622096e28065f850ddfd0"
          });
          if (undefined !== "428018ef390622096e28065f850ddfd0") {
            console.log("App key : ");
            console.log(userInfo.appKey);
            getUserData();
            self.setState({ loginSuccess: true });
            self.setState({ loginFailed: false });
          }
        }
      })
      .catch(function fail() {});
  };

  /* Renders Login Form */

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

LoginPage.propTypes = {
  authorized: PropTypes.bool.isRequired,
  getUserData: PropTypes.func.isRequired
};

export default LoginPage;
