import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Album from '../src/pages/Album';
import Favorites from '../src/pages/Favorites';
import Login from '../src/pages/Login';
import NotFound from '../src/pages/NotFound';
import Profile from '../src/pages/Profile';
import ProfileEdit from '../src/pages/ProfileEdit';
import Search from '../src/pages/Search';
// import Link from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
              <Route path="/profile/edit" component={ProfileEdit} />
              <Route path="/profile" component={Profile} />
              <Route path="/favorites" component={Favorites} />
              <Route path="/album/:id" component={Album} />
              <Route path="/search" component={Search} />
              <Route exact path="/" component={Login} />
              <Route path="*" component={NotFound} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
