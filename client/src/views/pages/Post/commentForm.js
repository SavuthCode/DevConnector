import React, { useState } from 'react'
import { addComment } from '../../../actions/post';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const CommentForm = ({postId,addComment}) => {

  const [text,setText] = useState('');
  return (
    <div class="post-form">
      <div class="bg-primary p">
        <h3>Write comment here...</h3>
      </div>
      <form class="form my-1" 
        onSubmit={
          e => {e.preventDefault();
          addComment(postId,{text});
          setText('');
        }}
      >
        <textarea
          onChange={e =>  setText(e.target.value)}
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          required
        ></textarea>
        <input type="submit" class="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  )
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
}
export default connect(null, {addComment})(CommentForm);
