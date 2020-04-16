import TokenService from '../services/token-service'
import config from '../config'

const PostApiService = {
  getPosts() {
    return fetch(`${config.API_ENDPOINT}/posts`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getPost(postId) {
    return fetch(`${config.API_ENDPOINT}/posts/${postId}`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  }
}

export default PostApiService;
