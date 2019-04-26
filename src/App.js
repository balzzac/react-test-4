import React, { Component } from 'react';
import './App.css';

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

const emailRegExp = new RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

export class App extends Component {
  state = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    formErrors: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case 'firstName':
        formErrors.firstName =
          value.length === 0 ? 'First name can not be empty string' : '';
        break;
      case 'lastName':
        formErrors.lastName =
          value.length === 0 ? 'Last name can not be empty string' : '';
        break;
      case 'email':
        formErrors.email =
          value.length === 0
            ? 'Email can not be empty string'
            : emailRegExp.test(value)
            ? ''
            : 'Invalid email address. Check out the syntax';
        break;
      case 'password':
        formErrors.password =
          value.length === 0
            ? 'Password can not be empty string'
            : value.length < 8
            ? 'Password should be at least 8 characters long'
            : '';
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (formValid(this.state)) {
      console.log('Submitting');
    } else {
      console.error('form is invalid');
    }
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="first-name">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className={formErrors.firstName.length > 0 ? 'error' : null}
                placeholder="First Name"
                name="firstName"
                onChange={this.handleChange}
              />

              {formErrors.firstName.length > 0 && (
                <span className="error-message">{formErrors.firstName}</span>
              )}
            </div>

            <div className="last-name">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className={formErrors.lastName.length > 0 ? 'error' : null}
                placeholder="Last Name"
                name="lastName"
                onChange={this.handleChange}
              />
              {formErrors.lastName.length > 0 && (
                <span className="error-message">{formErrors.lastName}</span>
              )}
            </div>

            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className={formErrors.email.length > 0 ? 'error' : null}
                placeholder="Email"
                name="email"
                onChange={this.handleChange}
              />

              {formErrors.email.length > 0 && (
                <span className="error-message">{formErrors.email}</span>
              )}
            </div>

            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className={formErrors.password.length > 0 ? 'error' : null}
                placeholder="Password"
                name="password"
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="error-message">{formErrors.password}</span>
              )}
            </div>
            <div className="create-account">
              <button type="submit">Create Account</button>
              <small>Already Have an Account?</small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
