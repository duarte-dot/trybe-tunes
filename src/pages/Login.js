import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Brand from '../components/Brand';
import { createUser } from '../services/userAPI';
import '../styles/loginPage.css';

const MIN_NAME_LENGTH = 3;
const HERO_IMAGE = 'https://github.com/duarte-dot/image-uploads/assets/78454964/061b23d4-f57e-4164-96fc-8560cd7a84a6';

class Login extends Component {
  constructor() {
    super();

    this.state = { isLoading: false, name: '' };
  }

  onNameChange = ({ target }) => this.setState({ name: target.value });

  onSubmit = async (event) => {
    event.preventDefault();

    const { history } = this.props;
    const { name } = this.state;

    this.setState({ isLoading: true });
    await createUser({ name: name.trim() });

    history.push('/search');
  };

  renderForm() {
    const { isLoading, name } = this.state;
    const isDisabled = name.trim().length < MIN_NAME_LENGTH || isLoading;

    return (
      <form className="login-card card" onSubmit={ this.onSubmit }>
        <h1 className="login-card__title">Log in</h1>
        <p className="login-card__text">No password needed. Just your name.</p>

        <label className="field" htmlFor="name">
          <span className="field__label">Your name</span>
          <input
            id="name"
            className="input"
            type="text"
            autoComplete="name"
            placeholder="e.g. Gabriel"
            value={ name }
            onChange={ this.onNameChange }
          />
          <span className="field__hint">
            {`At least ${MIN_NAME_LENGTH} characters.`}
          </span>
        </label>

        <button type="submit" className="btn btn--primary" disabled={ isDisabled }>
          {isLoading ? 'Entering...' : 'Enter'}
        </button>
      </form>
    );
  }

  render() {
    return (
      <div className="login-page">
        <section className="login-hero">
          <Brand />
          <h2 className="login-hero__title">Your music, your vibe.</h2>
          <p className="login-hero__text">
            Search any artist, preview their songs and keep the ones you love
            in a single favorites list.
          </p>
          <img className="login-hero__art" src={ HERO_IMAGE } alt="" />
        </section>

        {this.renderForm()}
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
