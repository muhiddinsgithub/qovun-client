import React, { Component } from 'react';
import PostContext from '../../contexts/PostContext';
import PostApiService from '../../services/post-api-service';
import { Section } from '../../components/Utils/Utils';
import './PostPage.css';

export default class PostPage extends Component {
  static defaultProps = {
    match: { params: {} },
  }

  static contextType = PostContext;

  componentDidMount() {
    const { postId } = this.props.match.params
    this.context.clearError()
    PostApiService.getPost(postId)
      .then(this.context.setPost)
      .catch(this.context.setError)
  }

  componentWillUnmount() {
    this.context.clearPost()
  }

  renderPost() {
    const { post } = this.context
    return <>
      <h2>{post.title}</h2>
      <PostContent post={post} />
    </>
  }

  render() {
    const { error, post } = this.context;
    let content;
    if (error) {
      content = (error.error === `Post doesn't exist`)
        ? <p className='red'>Post not found</p>
        : <p className='red'>There was an error</p>
    } else if (!post.id) {
      content = <div className='loading' />
    } else {
      content = this.renderPost()
    }
    return (
      <Section className='PostPage'>
        {content}
      </Section>
    )
  }
}

function PostContent({ post }) {
  return (
    <p className='PostPage__content'>
      {post.content}
    </p>
  )
}

