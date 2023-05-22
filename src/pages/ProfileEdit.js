import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../components/Sidebar';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      userInfoLogin: [],
      isLoading: true,
      isLoginButtonDisabled: true,
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    const userInfo = await getUser();
    this.setState({
      userInfoLogin: [userInfo],
      isLoading: false,
    }, () => {
      this.checkValues();
    });
  };

  checkValues = () => {
    const { userInfoLogin } = this.state;
    const min = 1;
    if (userInfoLogin[0].email.length >= min
        && (/^([\w+-]+\.)*[\w+-]+@([\w+-]+\.)*[\w+-]+\.[a-zA-Z]{2,4}$/.test(userInfoLogin[0].email))
        && userInfoLogin[0].name.length >= min) {
      this.setState({
        isLoginButtonDisabled: false,
      });
    } else {
      this.setState({
        isLoginButtonDisabled: true,
      });
    }
  };

  onInputChange = ({ target }) => {
    const { value, name } = target;
    const { userInfoLogin } = this.state;
    userInfoLogin[0][name] = value;
    this.setState({
      userInfoLogin,
    }, this.checkValues());
  };

  render() {
    const { isLoading, isLoginButtonDisabled, userInfoLogin } = this.state;
    if (isLoading) {
      return (
        <div className="page-profile">
          <Sidebar />
          <Loading />
        </div>
      );
    } return (
      <div className="page-profile">
        <Sidebar />
        <div className="main-content-profile">
          <h1 className="profile-section-name">Edit your profile!</h1>
          <form
            className="form-edit-profile"
            onSubmit={ async (e) => {
              e.preventDefault();
              this.setState({ isLoading: true });
              const { history } = this.props;
              await updateUser(userInfoLogin[0]);
              history.push('/profile');
            } }
          >
            <label htmlFor="name">
              <h2>
                Name:
              </h2>
              <input
                className="input-text-edit-name"
                type="text"
                value={ userInfoLogin[0].name }
                id="name"
                name="name"
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="email">
              <h2>
                E-mail:
              </h2>
              <input
                className="input-text-edit-name"
                type="text"
                value={ userInfoLogin[0].email }
                id="email"
                name="email"
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="description">
              <h2>
                Description:
              </h2>
              <textarea
                maxLength="500"
                id="description"
                value={ userInfoLogin[0].description }
                name="description"
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="image">
              <h2>
                Image (link):
              </h2>
              <input
                placeholder="your image link here"
                className="input-text-edit-name"
                type="text"
                value={ userInfoLogin[0].image }
                id="image"
                name="image"
                onChange={ this.onInputChange }
              />
            </label>
            <button
              name="buttonSubmit"
              type="submit"
              className="edit-button-save"
              disabled={ isLoginButtonDisabled }
            >
              edit profile
            </button>
          </form>
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
