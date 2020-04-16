import React, { Component } from 'react';
import PostListContext from '../../contexts/PostListContext';
import PostApiService from '../../services/post-api-service';
import { Section } from '../../components/Utils/Utils';
import PostListItem from '../../components/PostListItem/PostListItem';
import './PostListPage.css'

export default class PostListPage extends Component {
  static contextType = PostListContext;

  componentDidMount() {
    console.log(this.props.match.params.section);
    this.context.clearError()
    PostApiService.getPosts()
      .then(this.context.setPostList)
      .catch(this.context.setError)
  }

  renderPosts() {
    const { postList = [] } = this.context
    return postList.map(post =>
      <PostListItem
        key={post.post_id}
        post={post}
      />
    )
  }

  render() {
    const { error } = this.context
    return (
      <Section list className='PostListPage'>
        {error
          ? <p className='red'>There was an error, try again</p>
          : this.renderPosts()}
      </Section>
    )
  }
}
