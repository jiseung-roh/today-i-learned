import React, { Component } from 'react'
import { Link, withRouter } from 'react-router'

// edit이거나 new 이거나 = this.props.location.pathname 을 통해
// 알 수 있습니다 
class PostForm extends Component {
  componentDidMount() {
    const { posts, currentPost } = this.props
    if ( currentPost !== null ) {
      const post = posts[currentPost]
      this.postTitle.value = post.title
      this.postContent.value = post.content;
    }
  }
  constructor(props) {
    super(props);
    // 왜 syntax error? handleInputChange = () => {}
    this.state = {
      title: null,
      content: null
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleTextareaChange = this.handleTextareaChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.redirect = this.redirect.bind(this)
  }
  handleInputChange(e) {
    this.setState({
      title: e.target.value
    })
  }
  handleTextareaChange(e) {
    this.setState({
      content: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    const { posts, currentPost } = this.props
    const post = {
       title: this.state.title ? this.state.title : posts[currentPost].title,
       content: this.state.content ? this.state.content : posts[currentPost].content
     }
    // Edit
    if ( currentPost !== null ) {
      post.postId = currentPost
      this.props.editPost(currentPost, post)
      this.redirect(currentPost)
    } else {
      const postId = posts[posts.length - 1].postId + 1
      post.postId = postId
      this.props.addPost(post)
      this.props.selectPost(postId)
      this.redirect(postId)
    }
  }
  redirect(postId) {
    const redirectUrl = `/post/${postId}`
    this.props.router.push(redirectUrl)
  }
  render() {
    return (
      <section className="post-form">
        <form onSubmit={this.handleSubmit}>
          <div className="post-util">
            <Link
              to="/"
              className="btn">Cancel</Link>
            <button
              type="submit"
              className="btn btn--green">Save</button>
          </div>
          <label
            htmlFor="post_title"
            className="sr-only">Title</label>
          <input
            id="post_title"
            className="post-title"
            type="text"
            placeholder="Title"
            onChange={this.handleInputChange}
            ref={input => this.postTitle = input} />
          <label
            htmlFor="post_content"
            className="sr-only">Content</label>
          <textarea
            id="post_cotent"
            className="post-content"
            placeholder="Write a story..."
            onChange={this.handleTextareaChange}
            ref={input => this.postContent = input }>
          </textarea>
        </form>
      </section>
    );
  }
}

export default PostForm