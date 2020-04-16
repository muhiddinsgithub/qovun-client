import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './PostListItem.css';

export default class PostListItem extends Component {
  render() {
    const { post } = this.props; 

    return (
      <Link to={`/post/${post.id}`} className='PostListItem'>
        {/* <div className='PostListItem__image' style={{backgroundImage: `url(${post.image})`}} /> */}
        <div className='PostListItem__details'>
          <div className='PostListItem__text'>
            <h2 className='PostListItem__heading'>{post.title}</h2>
            <p className='PostListItem__description'>{truncate(post.content)}</p>
          </div>
        </div>
      </Link>
    )
  }
}



function truncate(text) {
  const words = text.split(' ')

  if (words.length > 10) {
    return words.slice(0, 10).join(' ') + ' ...'
  }

  return text
}
