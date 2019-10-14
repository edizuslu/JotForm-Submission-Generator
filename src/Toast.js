/* eslint-disable react/jsx-filename-extension */
import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

class Toast extends Component {
  notify = () => toast("Wow so easy !");

  render() {
    return (
      <div>
        <button type="button" onClick={this.notify}>
          Notify !
        </button>
        <ToastContainer />
      </div>
    );
  }
}

export default Toast;
