import React, { useState } from 'react'
import blogService from '../services/blogs'

// components
import Togglable from './Togglable'

// redux
import { useDispatch } from 'react-redux'
import { removeBlog } from '../reducers/blogsReducer'

// style
import { Button, Form } from 'react-bootstrap'

// react router
import { Link, useHistory } from 'react-router-dom'

const LikesButton = ({ likes, handleLikes }) => {
  return (
    <div>
      likes {likes}{' '}
      <Button id="likesButton" onClick={handleLikes}>
        like
      </Button>
    </div>
  )
}
const Blog = ({ blog }) => {
  return (
    <Link to={`/blogs/${blog.id}`}>
      {blog.title} {blog.author}
    </Link>
  )
}
const ToggledBlog = ({ index, blog, user }) => {
  const dispatch = useDispatch()
  const [blogLikes, setBlogLikes] = useState(blog.likes)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const handleLikes = async () => {
    await blogService.update(blog.id, {
      likes: blogLikes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    })
    setBlogLikes(blogLikes + 1)
  }
  const handleRemove = async () => {
    dispatch(removeBlog(blog, index))
  }
  return (
    <div className="blogDetail" style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable showLabel="view" hideLabel="hide">
        <p>{blog.url}</p>
        <LikesButton likes={blogLikes} handleLikes={handleLikes} />
        <p>{blog.user.name}</p>
        {blog.user.id === user.id ? (
          <Button onClick={handleRemove}>remove</Button>
        ) : blog.user === user.id ? (
          <Button onClick={handleRemove}>remove</Button>
        ) : (
          ''
        )}
      </Togglable>
    </div>
  )
}

const BlogDetail = ({ blog, user }) => {
  const history = useHistory()

  const dispatch = useDispatch()
  const [blogLikes, setBlogLikes] = useState(blog.likes)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const handleLikes = async () => {
    await blogService.update(blog.id, {
      likes: blogLikes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    })
    setBlogLikes(blogLikes + 1)
  }
  const handleRemove = async () => {
    dispatch(removeBlog(blog))
    history.goBack()
    // history.push('/')
  }
  return (
    <div className="blogDetail" style={blogStyle}>
      {blog.title} {blog.author}
      <p>{blog.url}</p>
      <LikesButton likes={blogLikes} handleLikes={handleLikes} />
      <p>{blog.user.name}</p>
      {blog.user.id === user.id ? (
        <Button onClick={handleRemove}>remove</Button>
      ) : blog.user === user.id ? (
        <Button onClick={handleRemove}>remove</Button>
      ) : (
        ''
      )}
    </div>
  )
}
const NewBlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    addBlog({
      title: title,
      author: author,
      url: url,
    })
  }

  return (
    <div>
      <Form onSubmit={handleCreate}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
          <Form.Label>Author:</Form.Label>
          <Form.Control
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
          <Form.Label>URL</Form.Label>
          <Form.Control
            id="url"
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
          <Button id="newBlogButton" type="submit">
            create
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}
export { Blog, BlogDetail, NewBlogForm, LikesButton, ToggledBlog }
