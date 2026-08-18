import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import { FALLBACK_AVATAR } from '../components/UserBadge';
import { getUser, updateUser } from '../services/userAPI';
import '../styles/profileEdit.css';

const EMAIL_REGEX = /^[\w+-]+(\.[\w+-]+)*@[\w-]+(\.[\w-]+)*\.[a-z]{2,}$/i;
const DESCRIPTION_MAX = 500;
const PAGE_TITLE = 'Edit profile';
const EMPTY_USER = { description: '', email: '', image: '', name: '' };

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      isSaving: false,
      touched: {},
      user: EMPTY_USER,
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  onChange = ({ target: { name, value } }) => this.setState((prev) => ({
    user: { ...prev.user, [name]: value },
  }));

  onBlur = ({ target: { name } }) => this.setState((prev) => ({
    touched: { ...prev.touched, [name]: true },
  }));

  onSubmit = async (event) => {
    event.preventDefault();

    const { history } = this.props;
    const { user } = this.state;

    this.setState({ isSaving: true });
    await updateUser(user);

    history.push('/profile');
  };

  getErrors() {
    const { user } = this.state;

    return {
      email: EMAIL_REGEX.test(user.email.trim()) ? '' : 'Enter a valid e-mail.',
      name: user.name.trim() ? '' : 'Your name cannot be empty.',
    };
  }

  getUserInfo = async () => {
    const user = await getUser();

    this.setState({ isLoading: false, user: { ...EMPTY_USER, ...user } });
  };

  renderPreview() {
    const { user } = this.state;

    return (
      <aside className="edit-preview card">
        <img
          className="edit-preview__avatar"
          src={ user.image || FALLBACK_AVATAR }
          alt=""
        />
        <p className="edit-preview__name">{user.name || 'Your name'}</p>
        <p className="edit-preview__email">{user.email || 'your@email.com'}</p>
      </aside>
    );
  }

  renderField(name, label, type, placeholder) {
    const { touched, user } = this.state;
    const error = touched[name] ? this.getErrors()[name] : '';

    return (
      <label className="field" htmlFor={ name }>
        <span className="field__label">{label}</span>
        <input
          id={ name }
          className="input"
          type={ type }
          name={ name }
          placeholder={ placeholder }
          value={ user[name] }
          onChange={ this.onChange }
          onBlur={ this.onBlur }
        />
        <span className="field__error">{error}</span>
      </label>
    );
  }

  renderDescription() {
    const { user } = this.state;

    return (
      <label className="field" htmlFor="description">
        <span className="field__label">Description</span>
        <textarea
          id="description"
          className="textarea"
          name="description"
          maxLength={ DESCRIPTION_MAX }
          placeholder="Tell people what you listen to"
          value={ user.description }
          onChange={ this.onChange }
        />
        <span className="field__hint">
          {`${user.description.length}/${DESCRIPTION_MAX}`}
        </span>
      </label>
    );
  }

  renderActions() {
    const { isSaving } = this.state;
    const errors = this.getErrors();
    const isDisabled = isSaving || Boolean(errors.email || errors.name);

    return (
      <div className="edit-form__actions">
        <Link to="/profile" className="btn btn--ghost">Cancel</Link>
        <button type="submit" className="btn btn--primary" disabled={ isDisabled }>
          {isSaving ? 'Saving...' : 'Save profile'}
        </button>
      </div>
    );
  }

  renderForm() {
    return (
      <form className="edit-form card" onSubmit={ this.onSubmit }>
        {this.renderField('name', 'Name', 'text', 'Your name')}
        {this.renderField('email', 'E-mail', 'email', 'your@email.com')}
        {this.renderField('image', 'Image link', 'text', 'https://...')}
        {this.renderDescription()}
        {this.renderActions()}
      </form>
    );
  }

  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      return <Layout title={ PAGE_TITLE }><Loading /></Layout>;
    }

    return (
      <Layout title={ PAGE_TITLE } subtitle="Update how others see you">
        <div className="edit-grid">
          {this.renderPreview()}
          {this.renderForm()}
        </div>
      </Layout>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
