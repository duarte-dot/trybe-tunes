import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import CardProfile from '../components/CardProfile';
import Loading from '../components/Loading';
import './profile.css';

class Profile extends Component {
  state = {
    userInfoLogin: [],
    isLoading: true,
  };

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    const userInfo = await getUser();
    this.setState({
      userInfoLogin: [userInfo],
      isLoading: false,
    });
  };

  render() {
    const { userInfoLogin, isLoading } = this.state;
    if (isLoading) {
      return (
        <div className="page-profile">
          <Header />
          <div data-testid="page-profile" className="main-content-profile">
            <Loading />
          </div>
        </div>
      );
    } return (
      <div data-testid="page-profile" className="page-profile">
        <Header />
        <div className="main-content-profile">
          <h2 className="section-name">Profile</h2>
          { userInfoLogin.map((e, index) => (<CardProfile
            name={ e.name }
            email={ e.email }
            image={ e.image }
            description={ e.description }
            key={ index }
          />))}
        </div>
        <Link className="link-edit-profile" to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}

export default Profile;
