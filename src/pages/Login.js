import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../styles/loginPage.css';

const MIN_NAME_LENGTH = 3;

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      userLoggingIn: false,
    };

    this.onNameInputChange = this.onNameInputChange.bind(this);
  }

  createUserAndRedirect = async (event) => {
    event.preventDefault();

    const { history } = this.props;
    const { name } = this.state;

    this.setState({ userLoggingIn: true });

    await createUser({ name });

    history.push('/search');
  };

  onNameInputChange = (event) => {
    const name = event.target.value;
    this.setState({ name });
  };

  render() {
    const { name, userLoggingIn } = this.state;
    const loginButtonDisabled = name.length < MIN_NAME_LENGTH;

    if (userLoggingIn) {
      return (
        <div className="page-loading-login">
          <Loading />
        </div>
      );
    }

    return (
      <div className="login-page">
        <div className="logo">
          <h1 className="logo-title">
            <span>Trybe</span>
            <span>Tunes</span>
          </h1>
          <img className="logo-image" src="https://github.com/duarte-dot/image-uploads/assets/78454964/061b23d4-f57e-4164-96fc-8560cd7a84a6" alt="logo" />
        </div>
        <div className="login-box">
          <form className="login-form" onSubmit={ this.createUserAndRedirect }>
            <h1 className="login-title">Login</h1>

            <input
              type="text"
              className="login-name-input"
              placeholder="what's your name?"
              onChange={ this.onNameInputChange }
            />

            <button
              type="submit"
              className="button-login"
              disabled={ loginButtonDisabled }
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
