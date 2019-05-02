import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

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

  //star ?
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    //? but why will it happen
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
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
            <span className="red-text">{errors.name}</span>
            <input
              type="text"
              onChange={this.onChange}
              name="name"
              value={name}
              className={classnames("", {
                invalid: errors.name
              })} //? classnames? A simple javascript utility for conditionally joining classNames together
            />
          </div>
          <div>
            <label>Email: </label>
            <span className="red-text">{errors.email}</span>
            <input
              type="email"
              onChange={this.onChange}
              name="email"
              value={email}
              className={classnames("", {
                invalid: errors.email
              })}
            />
          </div>
          <div>
            <label>Password: </label>
            <span className="red-text">{errors.password}</span>
            <input
              type="password"
              onChange={this.onChange}
              name="password"
              value={password}
              className={classnames("", {
                invalid: errors.password
              })}
            />
          </div>
          <div>
            <label>Confirm Password: </label>
            <span className="red-text">{errors.password2}</span>
            <input
              type="password"
              onChange={this.onChange}
              name="password2"
              value={password2}
              className={classnames("", {
                invalid: errors.password2
              })}
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  //which action / reducer is it linking from?
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
