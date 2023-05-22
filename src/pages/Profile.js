import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { UilPen } from '@iconscout/react-unicons';
import Sidebar from '../components/Sidebar';
import { getUser } from '../services/userAPI';
import ProfileCard from '../components/ProfileCard';
import Loading from '../components/Loading';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      userInfoLogin: [],
      isLoading: true,
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
    });
  };

  render() {
    const { userInfoLogin, isLoading } = this.state;
    if (isLoading) {
      return (
        <div className="page-profile">
          <Sidebar />
          <div className="page-loading-profile">
            <Loading />
          </div>
        </div>
      );
    } return (
      <div className="page-profile">
        <Sidebar />
        <h1 className="profile-section-name">Profile</h1>
        <div className="main-content-profile">
          { userInfoLogin.map((e, index) => (<ProfileCard
            name={ e.name }
            email={ e.email }
            image={ e.image }
            description={ e.description }
            key={ index }
          />))}
          <Link className="link-edit-profile" to="/profile/edit"><UilPen /></Link>
        </div>
      </div>
    );
  }
}

export default Profile;
