import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from '../Header/Header'
import PrivateRoute from '../Utils/PrivateRoute'
import HomePage from '../HomePage/HomePage'
import Footer from '../Footer/Footer'
import PublicOnlyRoute from '../Utils/PublicOnlyRoute'
import PostListPage from '../../routes/PostListPage/PostListPage'
import PostPage from '../../routes/PostPage/PostPage'
import LoginPage from '../../routes/LoginPage/LoginPage'
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
import './App.css'

class App extends Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  render() {
    return (
      <div className='App'>
        <header className='App__header'>
          <Header />
        </header>
        <main className='App__main'>
          {this.state.hasError && <p className='red'>There was an error! Oh no!</p>}
          <Switch>
            <PublicOnlyRoute
              exact path={'/'}
              component={HomePage}
            />
            <Route
              exact
              path={'/view/:section'}
              component={PostListPage}
            /> 
            <PublicOnlyRoute
              path={'/login'}
              component={LoginPage}
            />
            <PublicOnlyRoute
              path={'/register'}
              component={RegistrationPage}
            />
            <PrivateRoute
              path={'/post/:post_id'}
              component={PostPage}
            />
            <Route
              component={NotFoundPage}
            />
          </Switch>
        </main>
        <footer className='App__footer'>
          <Footer />
        </footer>
      </div>
    )
  }
}

export default App
