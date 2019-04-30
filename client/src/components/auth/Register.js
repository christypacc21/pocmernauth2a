import React, { Component } from "react";
import { Link } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {} //star
    };
  }

  handleSubmit = e => {
    e.preventDefault();
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value }); //star
  };

  render() {
    const { name, email, password, password2, errors } = this.state;
    return (
      <div>
        <Link to="/">
          <i className="material-icons left">keyboard_backspace</i> Back to home
        </Link>
        <div>
          <h4>
            <b>Register</b> below
          </h4>
          <p>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>

        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Name: </label>
            <input
              type="text"
              onChange={this.onChange}
              name="name"
              value={name}
            />
          </div>
          <div>
            <label>Email: </label>
            <input
              type="email"
              onChange={this.onChange}
              name="email"
              value={email}
            />
          </div>
          <div>
            <label>Password: </label>
            <input
              type="password"
              onChange={this.onChange}
              name="password"
              value={password}
            />
          </div>
          <div>
            <label>Confirm Password: </label>{" "}
            <input
              type="password"
              onChange={this.onChange}
              name="password2"
              value={password2}
            />
          </div>
          <div>
            <input type="submit" name="submit" value="Sign Up" />
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
