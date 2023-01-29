import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import CardProfile from '../components/CardProfile';
import Loading from '../components/Loading';

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
        <div data-testid="page-profile">
          <Header />
          <h2>Profile</h2>
          <Loading />
        </div>
      );
    } return (
      <div data-testid="page-profile">
        <Header />
        <h2>Profile</h2>
        { userInfoLogin.map((e, index) => (<CardProfile
          name={ e.name }
          email={ e.email }
          image={ e.image }
          description={ e.description }
          key={ index }
        />))}
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}

export default Profile;
