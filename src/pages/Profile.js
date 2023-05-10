import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
          <div data-testid="page-profile" className="main-content-profile">
            <Loading />
          </div>
        </div>
      );
    } return (
      <div data-testid="page-profile" className="page-profile">
        <Sidebar />
        <div className="main-content-profile">
          <h2 className="section-name">Profile</h2>
          <div className="infos-userdois">
            { userInfoLogin.map((e, index) => (<ProfileCard
              name={ e.name }
              email={ e.email }
              image={ e.image }
              description={ e.description }
              key={ index }
            />))}
            <Link className="link-edit-profile" to="/profile/edit">edit profile</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
