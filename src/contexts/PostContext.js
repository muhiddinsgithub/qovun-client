import React, { Component } from 'react';

export const nullPost = {
  author: {},
  tags: [],
}

const PostContext = React.createContext({
  post: nullPost,
  error: null,
  setError: () => {},
  clearError: () => { },
  setPost: () => {},
  clearPost: () => {},
})

export default PostContext;

export class PostProvider extends Component {
  state = {
    post: nullPost,
    error: null,
  };

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setPost = post => {
    this.setState({ post })
  }

  clearPost = () => {
    this.setPost(nullPost)
  }

  render() {
    const value = {
      post: this.state.post,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setPost: this.setPost,
      clearPost: this.clearPost,
    }
    return (
      <PostContext.Provider value={value}>
        {this.props.children}
      </PostContext.Provider>
    )
  }
}
