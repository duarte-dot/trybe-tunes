import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { createUser } from '../services/userAPI';
import './login.css';
import Loading from '../components/Loading';

class Login extends Component {
  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
  }

  state = {
    name: '',
    isLoginButtonDisabled: true,
    isLoggedIn: false,
  };

  createUserRedirect = (event) => {
    event.preventDefault();
    const { history } = this.props;
    const { name } = this.state;

    this.setState({
      isLoggedIn: true,
    }, async () => {
      await createUser({ name });
      history.push('/search');
    });
  };

  onInputChange = ({ target }) => {
    const { value } = target;
    this.setState({
      name: value,
    }, () => {
      const min = 3;
      if (value.length >= min) {
        this.setState({
          isLoginButtonDisabled: false,
        });
      } else {
        this.setState({
          isLoginButtonDisabled: true,
        });
      }
    });
  };

  render() {
    const { isLoginButtonDisabled, isLoggedIn } = this.state;
    if (isLoggedIn) {
      return <Loading />;
    }
    return (
      <div data-testid="page-login" className="page-login">
        <div className="box-login">
          <form className="form-login" onSubmit={ this.createUserRedirect }>
            <h2 className="login-title">Login</h2>
            <input
              placeholder="what's your name?"
              className="input-name-login"
              type="text"
              id="login"
              name="login"
              data-testid="login-name-input"
              onChange={ this.onInputChange }
            />
            <button
              className="button-login"
              type="submit"
              data-testid="login-submit-button"
              disabled={ isLoginButtonDisabled }
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
