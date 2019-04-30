import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div>
        <div>
          <div>
            <h4>
              <b>Build</b> a login/auth app with the <span>MERN</span> stack
              from scratch
            </h4>
            <p>
              Create a (minimal) full-stack app with user authentication via
              passport and JWTs
            </p>
            <br />

            <Link to="/register">
              <button>Register</button>
            </Link>
            <Link to="/login">
              <button>Log In</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;
