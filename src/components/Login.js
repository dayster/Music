import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

import { getCurrentUser, setupAuthToAPI } from '../actions/user_actions'

const scopes = [
  'user-read-private',
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-modify-private',
  'user-top-read',
  'user-library-read',
  'user-library-modify',
  'user-follow-read',
  'user-follow-modify'
]
const client_id = '8d7cb1d087644280982de543cbb92989'
const redirect_uri = 'http://localhost:8080/callback' // 'https://soundize.herokuapp.com/app'

const url =
  'https://accounts.spotify.com/authorize?client_id=' +
  client_id +
  '&redirect_uri=' +
  encodeURIComponent(redirect_uri) +
  '&scope=' +
  encodeURIComponent(scopes.join(' ')) +
  '&response_type=token'

const width = 450,
  height = 730,
  left = width / 2 - width / 2,
  top = height / 2 - height / 2
class Login extends Component {
  state = {
    navClassName: 'navbar-start'
  }
  componentDidMount() {
    window.addEventListener('message', e => this.auth(e), false)
  }
  auth = async event => {
    if (event.data.type == 'access_token') {
      await this.props.setupAuthToAPI(event.data.access_token)
      await this.props.getCurrentUser()
      this.props.history.push('/app')
    }
  }
  login = () => {
    window.open(
      url,
      'Spotify',
      'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' +
        width +
        ', height=' +
        height +
        ', top=' +
        top +
        ', left=' +
        left
    )
  }
  render() {
    console.log(url)
    return (
      <div className="login-wrapper">
        <div>
          <nav className="navbar ">
            <div className="navbar-brand">
              <NavLink className="navbar-item" to="/">
                <img
                  src={require('../images/Soundize-logo2.png')}
                  alt="soundize"
                />
              </NavLink>

              <a
                className="navbar-item is-hidden-desktop login-btn"
                onClick={() => this.login()}
                style={{ color: 'white' }}
              >
                <span>Login</span>
              </a>
            </div>

            <div id="navMenubd-example" className="navbar-menu">
              <div className="navbar-end">
                <a onClick={() => this.login()} className="login-btn">
                  <span>Login</span>
                </a>
              </div>
            </div>
          </nav>
          <section className="wrapper">
            <div className="banner-info">
              <h1>Discover a universe of music</h1>
              <h1>Login now!</h1>
              <p>
                <a onClick={() => this.login()} className="banner-button">
                  Login
                </a>
              </p>
              <br />
              <i
                className="fa fa-arrow-down scroll-down bounce"
                aria-hidden="true"
              />
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default withRouter(
  connect(null, { getCurrentUser, setupAuthToAPI })(Login)
)
