import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import './Header.css'
import logo from './qovun.png';

export default class Header extends Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken();
  }

  renderLogoutLink() {
    return (
      <div className='Header__logged-in'>
        <Link
          onClick={this.handleLogoutClick}
          to='/'>
          Logout
        </Link>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className='Header__not-logged-in'>
        <Link
          to='/login'>
          Log in
        </Link>
        <Link
          to='/register'>
          Register
        </Link>
      </div>
    )
  }

  render() {
    return <>
      <nav className='Header'>
        <h1>
          <Link to='/'>
            <img src={logo} alt=''/>
            {' '}
            <span id="qovun">Qovun</span>
          </Link>
        </h1>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}          
      </nav>
      <h2 id="about">Browse/Post Anything About Uzbek Community in the US</h2>
    </>
  }
}
