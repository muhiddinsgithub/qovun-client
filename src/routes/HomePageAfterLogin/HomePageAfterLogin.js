import React from 'react';
import PostContext from '../../contexts/PostContext';
import {Link} from 'react-router-dom';
import './HomePageAfterLogin.css';
import AuthApiService from '../../services/auth-api-service';


class HomePageAfterLogin extends React.Component {

  static contextType = PostContext;

  state = {
    name: ''
  }
  componentDidMount() {
    AuthApiService.getUserId()
      .then(this.context.setUser);
    AuthApiService.getName()
    .then(res => {
      this.setState({ name: res.full_name})
    });
    
  }

  render() {
    return (
      <div>
        Welcome, {this.state.name}
        <ul id="afterLoginNav">
          <li><Link to="/add-post">Add a post</Link></li> |
          <li><Link to="/post-history">Your recent posts</Link></li>
        </ul>
      </div>
    )
  }

}

export default HomePageAfterLogin; 