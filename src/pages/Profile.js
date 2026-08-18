import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { UilPen } from '@iconscout/react-unicons';
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import ProfileCard from '../components/ProfileCard';
import { getUser } from '../services/userAPI';
import '../styles/profile.css';

const ICON_SIZE = 18;
const PAGE_TITLE = 'Profile';

class Profile extends Component {
  constructor() {
    super();

    this.state = { isLoading: true, user: {} };
  }

  componentDidMount() {
    this.loadUser();
  }

  loadUser = async () => {
    const user = await getUser();
    this.setState({ isLoading: false, user });
  };

  render() {
    const { isLoading, user } = this.state;

    if (isLoading) {
      return <Layout title={ PAGE_TITLE }><Loading /></Layout>;
    }

    const editLink = (
      <Link to="/profile/edit" className="btn btn--ghost">
        <UilPen size={ ICON_SIZE } />
        Edit profile
      </Link>
    );

    return (
      <Layout title={ PAGE_TITLE } subtitle="Your public info" actions={ editLink }>
        <ProfileCard
          name={ user.name }
          email={ user.email }
          image={ user.image }
          description={ user.description }
        />
      </Layout>
    );
  }
}

export default Profile;
