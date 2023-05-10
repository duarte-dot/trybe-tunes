import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

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
      return <Loading />;
    }

    return (
      <div className="login-page">
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
