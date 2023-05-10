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
    // console.log(userInfo);
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
        && userInfoLogin[0].name.length >= min
        && userInfoLogin[0].description.length >= min
        && userInfoLogin[0].image.length >= min) {
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
    console.log(userInfoLogin);
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
          <div data-testid="page-profile-edit" className="main-content-profile">
            <h1>Profile edit</h1>
            <Loading />
          </div>
        </div>
      );
    } return (
      <div data-testid="page-profile-edit" className="page-profile">
        <Sidebar />
        <div className="main-content-profile">
          <h1 className="section-name">Profile edit</h1>
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
              <div>
                Name:
              </div>
              <input
                className="input-text-edit-name"
                type="text"
                value={ userInfoLogin[0].name }
                id="name"
                name="name"
                data-testid="edit-input-name"
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="email">
              <div>
                E-mail:
              </div>
              <input
                className="input-text-edit-name"
                type="text"
                value={ userInfoLogin[0].email }
                id="email"
                name="email"
                data-testid="edit-input-email"
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="description">
              <div>
                Description:
              </div>
              <textarea
                maxLength="500"
                id="description"
                value={ userInfoLogin[0].description }
                name="description"
                data-testid="edit-input-description"
                onChange={ this.onInputChange }
              />
            </label>
            <label htmlFor="image">
              <div>
                Image:
              </div>
              <input
                placeholder="your image link here"
                className="input-text-edit-name"
                type="text"
                value={ userInfoLogin[0].image }
                id="image"
                name="image"
                data-testid="edit-input-image"
                onChange={ this.onInputChange }
              />
            </label>
            <button
              name="buttonSubmit"
              type="submit"
              data-testid="edit-button-save"
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
