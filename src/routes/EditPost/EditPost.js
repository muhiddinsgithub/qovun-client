import React from 'react';
import PostContext from '../../contexts/PostContext';
import PostApiService from '../../services/post-api-service';
import { Button } from '../../components/Utils/Utils';



class PostForm extends React.Component {
  
  static contextType = PostContext;
  componentDidMount() {
    const { post_id } = this.props.match.params;
    this.context.clearError()
    PostApiService.getPost(post_id)
      .then(this.context.setPost)
      .catch(this.context.setError)
  }

  handleSubmit = event => {
    event.preventDefault()
    
    const { title, content, section } = event.target;
    const { post_id } = this.props.match.params;

    PostApiService.editPost(title.value, section.value, content.value, post_id)
      .then(this.context.addPost)
      .then((post) => {
        title.value = '';
        section.value = '';
        content.value = '';
        this.props.history.push(`/posts/${post_id}`)
      })
      .catch(this.context.setError)
  }

  render() {
    const { post } = this.context;
    console.log('post', post);
    let sections = ['Jobs', 'Events', 'Apartments', 'Cars', 'Other'];
    return(
      <div>
        <form 
        className = 'postForm'
        onSubmit={this.handleSubmit}
        >
          <h1>Edit a post:</h1>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" defaultValue={post.title}/>

          <label htmlFor="post_category">Category:</label>
          <select id="section" name="section" >
            {sections.map(section => {
              return (
                <option value={section} selected={post.section === section}>{section}</option>
              )
            })}
          </select>

          <label htmlFor="content">Description:</label>
          <textarea id="content" name="content" aria-label='Write your post description..'
          placeholder="Write your post description.." defaultValue={post.content}/>
          <Button className="submit">
            Submit
          </Button> 
          <Button type="button" onClick={() => this.props.history.push('/')} className="cancel">
           Cancel
          </Button>         
        </form>
        
      </div>
    )
  }
}

export default PostForm;